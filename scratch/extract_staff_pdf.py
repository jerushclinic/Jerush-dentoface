import zlib, re

with open('pdf/Staff List for Id Card - Google Sheets.pdf', 'rb') as f:
    pdf_data = f.read()

def get_obj(num):
    match = re.search(rb'\b' + str(num).encode() + rb' 0 obj(.*?)endobj', pdf_data, re.DOTALL)
    if not match: return None
    raw = match.group(1)
    st = re.search(rb'stream[\r\n]+(.*?)[\r\n]+endstream', raw, re.DOTALL)
    if st:
        try:
            return zlib.decompress(st.group(1))
        except:
            return st.group(1)
    return raw

def parse_cmap(cmap_bytes):
    cmap = {}
    if not cmap_bytes: return cmap
    text = cmap_bytes.decode('latin1', errors='ignore')
    
    for m in re.finditer(r'<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>', text):
        src = int(m.group(1), 16)
        dst = int(m.group(2), 16)
        cmap[src] = chr(dst)
        
    for m in re.finditer(r'<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>', text):
        src1 = int(m.group(1), 16)
        src2 = int(m.group(2), 16)
        dst = int(m.group(3), 16)
        for i in range(src2 - src1 + 1):
            cmap[src1 + i] = chr(dst + i)
            
    return cmap

cmap_f5 = parse_cmap(get_obj(23))
cmap_f6 = parse_cmap(get_obj(27))

page_contents = [7, 9, 11, 13, 15, 17]

all_rows = []

for page_idx, c_obj in enumerate(page_contents):
    stream = get_obj(c_obj)
    if not stream: continue
    
    bt_blocks = re.findall(rb'BT(.*?)ET', stream, re.DOTALL)
    
    items = []
    for block in bt_blocks:
        b_str = block.decode('latin1', errors='ignore')
        current_font = 'F5'
        cur_x = 0
        cur_y = 0
        lines = b_str.strip().split('\n')
        current_text = []
        block_x = 0
        block_y = 0
        
        for line in lines:
            line = line.strip()
            if not line: continue
            
            font_m = re.match(r'/(F\d+)\s+([\d\.]+)\s+Tf', line)
            if font_m:
                current_font = font_m.group(1)
                
            tm_m = re.match(r'[\d\.\-]+\s+[\d\.\-]+\s+[\d\.\-]+\s+[\d\.\-]+\s+([\d\.\-]+)\s+([\d\.\-]+)\s+Tm', line)
            if tm_m:
                cur_x = float(tm_m.group(1))
                cur_y = float(tm_m.group(2))
                block_x = cur_x
                block_y = cur_y
                
            td_m = re.match(r'([\d\.\-]+)\s+([\d\.\-]+)\s+Td', line)
            if td_m:
                cur_x += float(td_m.group(1))
                cur_y += float(td_m.group(2))
                
            tj_matches = re.findall(r'<([0-9a-fA-F]+)>\s*Tj', line)
            for hex_code in tj_matches:
                cid = int(hex_code, 16)
                cm = cmap_f5 if current_font == 'F5' else cmap_f6
                ch = cm.get(cid, f'[{current_font}:{hex_code}]')
                current_text.append(ch)
                
        full_text = "".join(current_text).strip()
        if full_text:
            items.append({
                'text': full_text,
                'x': block_x,
                'y': block_y,
                'page': page_idx + 1
            })
            
    items.sort(key=lambda it: (it['y'], it['x']))
    
    rows = []
    for it in items:
        matched_row = None
        for r in rows:
            if abs(r['y'] - it['y']) < 5:
                matched_row = r
                break
        if matched_row:
            matched_row['items'].append(it)
        else:
            rows.append({'y': it['y'], 'items': [it], 'page': page_idx + 1})
            
    for r in rows:
        r['items'].sort(key=lambda x: x['x'])
        row_str = " | ".join([it['text'] for it in r['items']])
        all_rows.append((r['page'], r['y'], row_str, r['items']))

with open('scratch/all_extracted_rows.txt', 'w') as out:
    for p, y, r_str, items in all_rows:
        out.write(f'[Page {p} Y={y:.1f}] {r_str}\n')

print(f"Extracted {len(all_rows)} rows to scratch/all_extracted_rows.txt")
