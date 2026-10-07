import zlib, re, json

with open('pdf/Staff List for Id Card - Google Sheets.pdf', 'rb') as f:
    pdf_data = f.read()

def parse_cmap(cmap_bytes):
    cmap = {}
    if not cmap_bytes: return cmap
    text = cmap_bytes.decode('latin1', errors='ignore')
    for m in re.finditer(r'<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>', text):
        cmap[int(m.group(1), 16)] = chr(int(m.group(2), 16))
    for m in re.finditer(r'<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>', text):
        s1, s2, d = int(m.group(1), 16), int(m.group(2), 16), int(m.group(3), 16)
        for i in range(s2 - s1 + 1): cmap[s1 + i] = chr(d + i)
    return cmap

def get_obj(num):
    match = re.search(rb'\b' + str(num).encode() + rb' 0 obj(.*?)endobj', pdf_data, re.DOTALL)
    if not match: return None
    raw = match.group(1)
    st = re.search(rb'stream[\r\n]+(.*?)[\r\n]+endstream', raw, re.DOTALL)
    return zlib.decompress(st.group(1)) if st else raw

cmap_f5 = parse_cmap(get_obj(23))
cmap_f6 = parse_cmap(get_obj(27))

page_contents = [7, 9, 11, 13, 15, 17]
all_elements = []

for page_idx, c_obj in enumerate(page_contents):
    stream = get_obj(c_obj)
    if not stream: continue
    bt_blocks = re.findall(rb'BT(.*?)ET', stream, re.DOTALL)
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
            if font_m: current_font = font_m.group(1)
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
                current_text.append(cm.get(cid, ''))
        t = "".join(current_text).strip()
        if t:
            all_elements.append({
                'page': page_idx + 1,
                'x': block_x,
                'y': block_y,
                'font': current_font,
                'text': t
            })

print(f"Extracted {len(all_elements)} text elements")
with open('scratch/all_elements.json', 'w') as f:
    json.dump(all_elements, f, indent=2)
