import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, ChevronDown, Plus, Undo, Redo, ExternalLink, Link as LinkIcon, Unlink, X, Check } from 'lucide-react';
import { blogService } from '../../services/blogService';
import { doctorService } from '../../services/doctorService';
import useUndoRedo from '../hooks/useUndoRedo';

const EMPTY_BLOG = {
  title: '', slug: '', excerpt: '', featuredImage: '', content: '',
  category: 'Orthodontics', publishedDate: '', readingTime: '5 min read',
  seoTitle: '', seoDescription: '', focusKeywords: '', secondaryKeywords: '', status: 'draft',
  author: { name: '', qualification: '', specialization: '', bio: '', image: '' }
};

const DEFAULT_CATEGORIES = ['Orthodontics', 'Dermatology', 'Hair Care', 'Oral Surgery', 'Cosmetic', 'General'];

const WEBSITE_INTERLINKS = [
  { label: 'All Treatments Catalogue', url: '/treatments' },
  { label: 'Anti-Dandruff Treatment', url: '/treatments/anti-dandruff-treatment' },
  { label: 'GFC Hair Therapy', url: '/hair-restoration-treatments/gfc-growth-factor-concentrate' },
  { label: 'Hair Transplantation', url: '/hair-restoration-treatments/hair-transplant' },
  { label: 'Clear Aligners (Jerushaligne)', url: '/dental-treatments/top-quality-invisible-clear-aligners-jerushaligne' },
  { label: 'Dental Implants', url: '/dental-implants' },
  { label: 'Root Canal Treatment', url: '/dental-treatments/root-canal-treatment-in-tamilnadu' },
  { label: 'Fractional CO2 Laser', url: '/cosmetic-dermatology-laser-treatments/fractional-co2-laser' },
  { label: 'Oral Pathology Screening', url: '/dental-treatments/oral-pathology-screening' },
  { label: 'Smile Transformations', url: '/smile-transformations' },
  { label: 'Meet Our Doctors', url: '/doctors' },
  { label: 'Book Appointment / Contact', url: '/contact' }
];

export default function BlogFormPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editSlug = searchParams.get('edit');

  const {
    state: form,
    setState: setForm,
    undo,
    redo,
    canUndo,
    canRedo,
    reset: resetForm
  } = useUndoRedo(EMPTY_BLOG);

  const [doctors, setDoctors] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved] = useState(false);

  // Editor states
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'html'
  const [headingDropdownOpen, setHeadingDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageTab, setImageTab] = useState('url'); // 'url' | 'upload'
  const [selectedLayout, setSelectedLayout] = useState('full'); // 'full' | 'left' | 'right'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeBlockLabel, setActiveBlockLabel] = useState('Normal');

  // Link Management states
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkFormData, setLinkFormData] = useState({ text: '', url: '', openInNewTab: false });
  const [activeLinkPopover, setActiveLinkPopover] = useState(null);
  const savedRangeRef = useRef(null);
  const editingLinkNodeRef = useRef(null);

  // Custom Category states
  const [categoriesList, setCategoriesList] = useState(DEFAULT_CATEGORIES);
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const editorRef = useRef(null);
  const isInternalChange = useRef(false);

  const headingOptions = [
    { label: 'Normal', value: '<p>' },
    { label: 'H1', value: '<h1>' },
    { label: 'H2', value: '<h2>' },
    { label: 'H3', value: '<h3>' },
    { label: 'H4', value: '<h4>' },
    { label: 'Quote', value: '<blockquote>' }
  ];

  // Fetch doctors & blogs for category listing
  useEffect(() => {
    doctorService.getDoctors().then(setDoctors);
    
    // Scan unique categories from existing blogs
    blogService.getBlogs().then((allBlogs) => {
      if (allBlogs && Array.isArray(allBlogs)) {
        const dbCategories = allBlogs
          .map(b => b.category)
          .filter(c => c && typeof c === 'string' && c.trim() !== '');
        
        setCategoriesList(prev => {
          const unique = new Set([...prev, ...dbCategories]);
          return Array.from(unique);
        });
      }
    });

    if (editSlug) {
      blogService.getBlogBySlug(editSlug).then((blog) => {
        if (blog) {
          resetForm(blog);
        }
      });
    } else {
      resetForm(EMPTY_BLOG);
    }
  }, [editSlug, resetForm]);

  // Sync content Editable with state on initial load, async data fetch, mode toggles, and undo/redo
  useEffect(() => {
    if (editorRef.current && editorMode === 'visual') {
      if (isInternalChange.current) {
        isInternalChange.current = false;
        return;
      }
      const targetHtml = form.content || '<p><br></p>';
      if (editorRef.current.innerHTML !== targetHtml) {
        editorRef.current.innerHTML = targetHtml;
      }
    }
  }, [form.content, editorMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from title
    if (name === 'title' && !editSlug) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setForm((prev) => ({ ...prev, slug }));
    }
  };

  const handleSwitchMode = (newMode) => {
    if (newMode === editorMode) return;
    if (newMode === 'html') {
      if (editorRef.current) {
        setForm(prev => ({ ...prev, content: editorRef.current.innerHTML }));
      }
      setEditorMode('html');
    } else {
      setEditorMode('visual');
    }
  };

  const handleVisualInput = () => {
    if (editorRef.current) {
      isInternalChange.current = true;
      const html = editorRef.current.innerHTML;
      setForm(prev => ({ ...prev, content: html }));
    }
  };

  const openLinkModal = (existingLinkNode = null) => {
    setActiveLinkPopover(null);
    const sel = window.getSelection();

    if (existingLinkNode) {
      editingLinkNodeRef.current = existingLinkNode;
      const href = existingLinkNode.getAttribute('href') || '';
      const text = existingLinkNode.textContent || '';
      const isNewTab = existingLinkNode.getAttribute('target') === '_blank';
      setLinkFormData({ text, url: href, openInNewTab: isNewTab });
      savedRangeRef.current = null;
    } else {
      editingLinkNodeRef.current = null;
      let selectedText = '';
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const parentLink = range.commonAncestorContainer?.nodeType === 1 
          ? range.commonAncestorContainer.closest('a')
          : range.commonAncestorContainer?.parentElement?.closest('a');
        
        if (parentLink && editorRef.current?.contains(parentLink)) {
          editingLinkNodeRef.current = parentLink;
          setLinkFormData({
            text: parentLink.textContent || '',
            url: parentLink.getAttribute('href') || '',
            openInNewTab: parentLink.getAttribute('target') === '_blank'
          });
          savedRangeRef.current = null;
          setLinkModalOpen(true);
          return;
        }

        savedRangeRef.current = range.cloneRange();
        selectedText = range.toString();
      }
      setLinkFormData({
        text: selectedText,
        url: '',
        openInNewTab: false
      });
    }
    setLinkModalOpen(true);
  };

  const handleSaveLink = () => {
    let rawUrl = (linkFormData.url || '').trim();
    if (!rawUrl) return;

    let normalizedUrl = rawUrl;
    if (
      !normalizedUrl.startsWith('http://') &&
      !normalizedUrl.startsWith('https://') &&
      !normalizedUrl.startsWith('/') &&
      !normalizedUrl.startsWith('#') &&
      !normalizedUrl.startsWith('mailto:') &&
      !normalizedUrl.startsWith('tel:')
    ) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const textToDisplay = linkFormData.text?.trim() || normalizedUrl;

    if (editingLinkNodeRef.current && editorRef.current?.contains(editingLinkNodeRef.current)) {
      const a = editingLinkNodeRef.current;
      a.setAttribute('href', normalizedUrl);
      a.textContent = textToDisplay;
      if (linkFormData.openInNewTab) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      } else {
        a.removeAttribute('target');
        a.removeAttribute('rel');
      }
      editingLinkNodeRef.current = null;
    } else {
      if (savedRangeRef.current) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(savedRangeRef.current);

        const a = document.createElement('a');
        a.href = normalizedUrl;
        a.textContent = textToDisplay;
        if (linkFormData.openInNewTab) {
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
        }

        savedRangeRef.current.deleteContents();
        savedRangeRef.current.insertNode(a);
        
        const newRange = document.createRange();
        newRange.setStartAfter(a);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
      } else if (editorRef.current) {
        const targetBlank = linkFormData.openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';
        const linkHtml = `<a href="${normalizedUrl}"${targetBlank}>${textToDisplay}</a>&nbsp;`;
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0 && editorRef.current.contains(sel.anchorNode)) {
          insertHTMLAtCursor(linkHtml);
        } else {
          editorRef.current.focus();
          const p = editorRef.current.querySelector('p:last-child') || editorRef.current;
          const a = document.createElement('a');
          a.href = normalizedUrl;
          a.textContent = textToDisplay;
          if (linkFormData.openInNewTab) {
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
          }
          p.appendChild(a);
          p.appendChild(document.createTextNode(' '));
        }
      }
    }

    handleVisualInput();
    setLinkModalOpen(false);
  };

  const handleUnlink = (linkNode = null) => {
    const targetLink = linkNode || editingLinkNodeRef.current;
    if (targetLink && editorRef.current?.contains(targetLink)) {
      const text = targetLink.textContent;
      const textNode = document.createTextNode(text);
      targetLink.parentNode?.replaceChild(textNode, targetLink);
      handleVisualInput();
    }
    setActiveLinkPopover(null);
    setLinkModalOpen(false);
  };

  const handleEditorClick = (e) => {
    const linkEl = e.target.closest('a');
    if (linkEl && editorRef.current?.contains(linkEl)) {
      e.preventDefault();
      const rect = linkEl.getBoundingClientRect();
      const editorRect = editorRef.current.getBoundingClientRect();
      setActiveLinkPopover({
        element: linkEl,
        url: linkEl.getAttribute('href') || '',
        text: linkEl.textContent || '',
        top: rect.bottom - editorRect.top + editorRef.current.scrollTop + 6,
        left: Math.max(8, Math.min(rect.left - editorRect.left, editorRect.width - 280))
      });
      return;
    }
    if (activeLinkPopover) {
      setActiveLinkPopover(null);
    }
  };

  const handlePaste = (e) => {
    const clipboardData = e.clipboardData;
    if (!clipboardData) return;

    const html = clipboardData.getData('text/html');
    if (html && html.includes('docs-internal-guid')) {
      e.preventDefault();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      doc.querySelectorAll('span[id^="docs-internal-guid"]').forEach(el => {
        el.removeAttribute('id');
        el.removeAttribute('style');
      });

      doc.querySelectorAll('span').forEach(span => {
        span.style.removeProperty('font-family');
        span.style.removeProperty('font-size');
        span.style.removeProperty('background-color');
        span.style.removeProperty('line-height');
        span.style.removeProperty('white-space');
      });

      insertHTMLAtCursor(doc.body.innerHTML);
      handleVisualInput();
    }
  };

  const execFormatter = (command, value = null) => {
    document.execCommand(command, false, value);
    handleVisualInput();
  };

  const insertHTMLAtCursor = (html) => {
    const sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      const el = document.createElement("div");
      el.innerHTML = html;
      const frag = document.createDocumentFragment();
      let node;
      let lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
      if (lastNode) {
        const newRange = range.cloneRange();
        newRange.setStartAfter(lastNode);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
      }
    }
  };

  const insertCustomBlock = (type) => {
    let html = '';
    if (type === 'vs') {
      html = `
        <div class="my-6 grid grid-cols-2 gap-4 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div>
            <h4 class="font-bold text-slate-850 dark:text-white mb-2">Option A</h4>
            <ul class="space-y-2 text-slate-650 dark:text-slate-350 text-sm list-disc pl-4">
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
          <div class="border-l border-slate-250 dark:border-slate-800 pl-4">
            <h4 class="font-bold text-slate-850 dark:text-white mb-2">Option B</h4>
            <ul class="space-y-2 text-slate-650 dark:text-slate-350 text-sm list-disc pl-4">
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
        </div>
        <p><br></p>
      `;
    } else if (type === 'split') {
      html = `
        <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80" class="rounded-xl object-cover w-full h-48" alt="Split layout image" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-slate-850 dark:text-white mb-2">Split Layout Title</h3>
            <p class="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">Add your split layout description here. This section is perfect for describing the image in detail or comparing two concepts side-by-side.</p>
          </div>
        </div>
        <p><br></p>
      `;
    } else if (type === 'faq') {
      html = `
        <h2 id="faq">Frequently Asked Questions</h2>
        <div class="my-6 space-y-4">
          <div class="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <h3 class="bg-slate-50 dark:bg-slate-900 px-5 py-3 font-bold text-slate-800 dark:text-white text-sm cursor-pointer">Q: Your question here?</h3>
            <p class="px-5 py-3 text-slate-600 dark:text-slate-350 text-sm leading-relaxed">Your answer goes here. Provide a clear and helpful response.</p>
          </div>
          <div class="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <h3 class="bg-slate-50 dark:bg-slate-900 px-5 py-3 font-bold text-slate-800 dark:text-white text-sm cursor-pointer">Q: Another question?</h3>
            <p class="px-5 py-3 text-slate-600 dark:text-slate-350 text-sm leading-relaxed">Another detailed answer here.</p>
          </div>
          <div class="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <h3 class="bg-slate-50 dark:bg-slate-900 px-5 py-3 font-bold text-slate-800 dark:text-white text-sm cursor-pointer">Q: One more question?</h3>
            <p class="px-5 py-3 text-slate-600 dark:text-slate-350 text-sm leading-relaxed">One more detailed answer here.</p>
          </div>
        </div>
        <p><br></p>
      `;
    } else if (type === 'callout') {
      html = `
        <div class="my-6 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 rounded-r-xl px-5 py-4">
          <p class="text-blue-800 dark:text-blue-300 text-sm font-semibold italic leading-relaxed">💡 Clinical Highlight: Enter your important note, tip, or clinical insight here.</p>
        </div>
        <p><br></p>
      `;
    } else if (type === 'sectionHeading') {
      html = `
        <div class="my-8">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white pb-2 border-b-2 border-brandSky/40">Section Title Here</h2>
        </div>
        <p><br></p>
      `;
    }
    
    if (editorRef.current) {
      editorRef.current.focus();
      insertHTMLAtCursor(html);
      handleVisualInput();
    }
  };

  const handleLocalImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target.result;
        let html = '';
        if (selectedLayout === 'full') {
          html = `
            <div class="blog-img-wrapper max-w-2xl mx-auto my-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 p-1">
              <img src="${base64Url}" class="w-full h-auto object-cover rounded-xl" alt="${file.name}" />
            </div>
            <p><br></p>
          `;
        } else if (selectedLayout === 'left') {
          html = `
            <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div class="blog-img-wrapper">
                <img src="${base64Url}" class="rounded-xl object-cover w-full h-auto" alt="${file.name}" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-850 dark:text-white mb-2">Section Heading</h3>
                <p class="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">Enter your text content here...</p>
              </div>
            </div>
            <p><br></p>
          `;
        } else if (selectedLayout === 'right') {
          html = `
            <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 class="text-lg font-bold text-slate-850 dark:text-white mb-2">Section Heading</h3>
                <p class="text-slate-655 dark:text-slate-350 text-sm leading-relaxed">Enter your text content here...</p>
              </div>
              <div class="blog-img-wrapper">
                <img src="${base64Url}" class="rounded-xl object-cover w-full h-auto" alt="${file.name}" />
              </div>
            </div>
            <p><br></p>
          `;
        }
        
        if (editorRef.current) {
          editorRef.current.focus();
          insertHTMLAtCursor(html);
          handleVisualInput();
        }
        setImageModalOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlInsert = (url) => {
    if (url) {
      let html = '';
      if (selectedLayout === 'full') {
        html = `
          <div class="blog-img-wrapper max-w-2xl mx-auto my-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 p-1">
            <img src="${url}" class="w-full h-auto object-cover rounded-xl" alt="Blog image" />
          </div>
          <p><br></p>
        `;
      } else if (selectedLayout === 'left') {
        html = `
          <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div class="blog-img-wrapper">
              <img src="${url}" class="rounded-xl object-cover w-full h-auto" alt="Blog image" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-850 dark:text-white mb-2">Section Heading</h3>
              <p class="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">Enter your text content here...</p>
            </div>
          </div>
          <p><br></p>
        `;
      } else if (selectedLayout === 'right') {
        html = `
          <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 class="text-lg font-bold text-slate-850 dark:text-white mb-2">Section Heading</h3>
              <p class="text-slate-655 dark:text-slate-350 text-sm leading-relaxed">Enter your text content here...</p>
            </div>
            <div class="blog-img-wrapper">
              <img src="${url}" class="rounded-xl object-cover w-full h-auto" alt="Blog image" />
            </div>
          </div>
          <p><br></p>
        `;
      }

      if (editorRef.current) {
        editorRef.current.focus();
        insertHTMLAtCursor(html);
        handleVisualInput();
      }
      setImageModalOpen(false);
    }
  };

  const handleAuthorSelect = (e) => {
    const doc = doctors.find((d) => d.name === e.target.value);
    if (doc) {
      setForm((prev) => ({
        ...prev,
        author: {
          name: doc.name,
          qualification: doc.qualification,
          specialization: doc.role,
          bio: doc.bio,
          image: doc.image || doc.fallbackImg
        }
      }));
    }
  };

  const handleSave = () => {
    const savePromise = editSlug 
      ? blogService.updateBlog(editSlug, form) 
      : blogService.addBlog(form);
      
    savePromise.then(() => {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        navigate('/admin/blog');
      }, 1000);
    }).catch(err => {
      alert(err.message || 'Failed to save blog post.');
    });
  };

  const inputCls = "w-full px-4 py-2.5 bg-white/40 dark:bg-slate-950/40 border border-white/50 dark:border-slate-800/80 rounded-xl text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-brandSky focus:bg-white/70 dark:focus:bg-slate-950/60 transition-all shadow-sm";
  const labelCls = "text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block";

  return (
    <div className="space-y-6 relative z-10 text-left">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin/blog')} className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-headline font-extrabold text-xl text-slate-850 dark:text-white">{editSlug ? 'Edit Blog Post' : 'New Blog Post'}</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">Write and configure your article</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowPreview(!showPreview)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/60 dark:bg-slate-900/60 border border-white/40 dark:border-slate-800/85 rounded-xl text-xs font-bold text-slate-650 dark:text-slate-300 hover:bg-white/90 dark:hover:bg-slate-900/90 transition-colors shadow-sm">
            <Eye className="w-3.5 h-3.5" />
            {showPreview ? 'Editor' : 'Preview'}
          </button>
          <button onClick={handleSave} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 ${saved ? 'bg-emerald-500 text-white' : 'bg-gradient-to-r from-brandBlue to-brandSky text-white hover:shadow-lg'}`}>
            <Save className="w-3.5 h-3.5" />
            {saved ? 'Saved!' : 'Save Post'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 rounded-2xl p-6 space-y-5 shadow-xl">
            <div>
              <label className={labelCls}>Title</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Enter the article title" required className={`${inputCls} !text-base !py-3 font-headline font-bold bg-white/70 dark:bg-slate-950/70`} />
            </div>

            <div>
              <label className={labelCls}>Slug</label>
              <div className="flex items-center gap-1 text-xs text-slate-400 bg-white/40 dark:bg-slate-950/40 border border-white/50 dark:border-slate-800/80 rounded-xl px-4 py-2.5 shadow-sm">
                <span>/blog/</span>
                <input name="slug" value={form.slug} onChange={handleChange} className="bg-transparent outline-none text-slate-850 dark:text-slate-200 flex-1 font-semibold" />
              </div>
            </div>

            <div>
              <label className={labelCls}>Excerpt</label>
              <textarea name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Brief article summary for listings..." rows={2} className={`${inputCls} resize-y min-h-[60px]`} />
            </div>

            {showPreview ? (
              <div>
                <label className={labelCls}>Content Preview</label>
                <div className="bg-white/30 dark:bg-slate-950/30 border border-white/30 dark:border-slate-800/80 rounded-xl p-6 prose prose-sm max-w-none min-h-[300px]" dangerouslySetInnerHTML={{ __html: form.content || '<p class="text-slate-400">No content yet...</p>' }} />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className={labelCls}>Body</label>
                  <div className="flex gap-1 p-0.5 bg-white/30 dark:bg-slate-950/40 rounded-xl border border-white/30 dark:border-slate-800/70">
                    <button
                      type="button"
                      onClick={() => handleSwitchMode('visual')}
                      className={`px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-wider transition-all ${
                        editorMode === 'visual'
                          ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-sm'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                      }`}
                    >
                      Normal Formats
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSwitchMode('html')}
                      className={`px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-wider transition-all ${
                        editorMode === 'html'
                          ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-sm'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                      }`}
                    >
                      HTML Code
                    </button>
                  </div>
                </div>

                {editorMode === 'visual' ? (
                  <div className="border border-white/40 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-white/45 dark:bg-slate-950/20 shadow-inner">
                    {/* Toolbar */}
                    <div className="relative z-30 flex flex-wrap items-center gap-1.5 p-2 border-b border-white/40 dark:border-slate-800/80 bg-white/20 dark:bg-slate-900/20 select-none">
                      {/* Undo */}
                      <button
                        type="button"
                        onClick={undo}
                        disabled={!canUndo}
                        className={`p-1.5 rounded-lg transition-colors ${
                          canUndo
                            ? 'text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white cursor-pointer'
                            : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                        }`}
                        title="Undo"
                      >
                        <Undo className="w-3.5 h-3.5" />
                      </button>

                      {/* Redo */}
                      <button
                        type="button"
                        onClick={redo}
                        disabled={!canRedo}
                        className={`p-1.5 rounded-lg transition-colors ${
                          canRedo
                            ? 'text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white cursor-pointer'
                            : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                        }`}
                        title="Redo"
                      >
                        <Redo className="w-3.5 h-3.5" />
                      </button>

                      <div className="h-5 w-[1px] bg-slate-200/50 dark:bg-slate-800/80 mx-1" />

                      {/* Headings Dropdown */}
                      <div className={`relative ${headingDropdownOpen ? 'z-50' : 'z-10'}`}>
                        <button
                          type="button"
                          onClick={() => setHeadingDropdownOpen(!headingDropdownOpen)}
                          className="flex items-center justify-between gap-1.5 px-3 py-1.5 bg-white/60 dark:bg-slate-900/60 border border-white/40 dark:border-slate-800/80 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 min-w-[85px] text-left hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors"
                        >
                          <span>{activeBlockLabel}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                        {headingDropdownOpen && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setHeadingDropdownOpen(false)} />
                            <div className="absolute top-full left-0 mt-1 w-40 bg-white dark:bg-slate-900 border border-white/50 dark:border-slate-850 rounded-xl shadow-lg z-50 p-1 space-y-0.5">
                              {headingOptions.map((opt) => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => {
                                    execFormatter('formatBlock', opt.value);
                                    setActiveBlockLabel(opt.label);
                                    setHeadingDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-750 dark:text-slate-300 font-semibold transition-colors"
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      <div className="h-5 w-[1px] bg-slate-200/50 dark:bg-slate-800/80 mx-1" />

                      {/* Bold */}
                      <button
                        type="button"
                        onClick={() => execFormatter('bold')}
                        className="p-1.5 hover:bg-white/80 dark:hover:bg-slate-800/80 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-black text-xs min-w-[28px] text-center"
                        title="Bold"
                      >
                        B
                      </button>

                      {/* Italic */}
                      <button
                        type="button"
                        onClick={() => execFormatter('italic')}
                        className="p-1.5 hover:bg-white/80 dark:hover:bg-slate-800/80 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-serif italic text-xs min-w-[28px] text-center"
                        title="Italic"
                      >
                        i
                      </button>

                      {/* Bullet List */}
                      <button
                        type="button"
                        onClick={() => execFormatter('insertUnorderedList')}
                        className="p-1.5 hover:bg-white/80 dark:hover:bg-slate-800/80 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                        title="Bullet List"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.007 5.25h-.007v-.008h.007V12Zm-.007 5.25h.007v.008H3.75v-.008Z" />
                        </svg>
                      </button>

                      {/* Link */}
                      <button
                        type="button"
                        onMouseDown={() => {
                          const sel = window.getSelection();
                          if (sel && sel.rangeCount > 0) {
                            savedRangeRef.current = sel.getRangeAt(0).cloneRange();
                          }
                        }}
                        onClick={() => openLinkModal()}
                        className="p-1.5 hover:bg-white/80 dark:hover:bg-slate-800/80 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                        title="Insert / Edit Link"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                        </svg>
                      </button>

                      <div className="h-5 w-[1px] bg-slate-200/50 dark:bg-slate-800/80 mx-1" />

                      {/* Image Insert */}
                      <button
                        type="button"
                        onClick={() => setImageModalOpen(true)}
                        className="flex items-center gap-1 px-2.5 py-1 hover:bg-white/80 dark:hover:bg-slate-800/80 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-[11px] font-extrabold uppercase tracking-wider"
                        title="Insert Image"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.008-.75h-.008v.008h.008V7.5Z" />
                        </svg>
                        Image
                      </button>

                      <div className="h-5 w-[1px] bg-slate-200/50 dark:bg-slate-800/80 mx-1" />

                      {/* More blocks dropdown */}
                      <div className={`relative ${moreDropdownOpen ? 'z-50' : 'z-10'}`}>
                        <button
                          type="button"
                          onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                          className="p-1.5 hover:bg-white/80 dark:hover:bg-slate-800/80 rounded-lg text-slate-600 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white"
                          title="More Block Layouts"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                          </svg>
                        </button>
                        {moreDropdownOpen && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setMoreDropdownOpen(false)} />
                            <div className="absolute top-full left-0 mt-1 w-52 bg-white dark:bg-slate-900 border border-white/50 dark:border-slate-850 rounded-xl shadow-lg z-50 p-1.5 space-y-1 animate-fadeIn">
                              <button
                                type="button"
                                onClick={() => {
                                  insertCustomBlock('vs');
                                  setMoreDropdownOpen(false);
                                }}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold transition-colors"
                              >
                                <div className="w-5 h-5 rounded bg-brandBlue/10 flex items-center justify-center text-brandBlue text-[10px] font-extrabold">VS</div>
                                Comparison Table (VS)
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  insertCustomBlock('split');
                                  setMoreDropdownOpen(false);
                                }}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold transition-colors"
                              >
                                <div className="w-5 h-5 rounded bg-brandSky/10 flex items-center justify-center text-brandSky text-[10px] font-extrabold">↔</div>
                                Image & Text Split
                              </button>

                              <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                              <button
                                type="button"
                                onClick={() => {
                                  insertCustomBlock('faq');
                                  setMoreDropdownOpen(false);
                                }}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold transition-colors"
                              >
                                <div className="w-5 h-5 rounded bg-amber-500/10 flex items-center justify-center text-amber-500 text-[10px] font-extrabold">?</div>
                                FAQ Section
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  insertCustomBlock('callout');
                                  setMoreDropdownOpen(false);
                                }}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold transition-colors"
                              >
                                <div className="w-5 h-5 rounded bg-brandSky/15 flex items-center justify-center text-brandBlue text-[10px] font-extrabold">💡</div>
                                Callout / Highlight
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  insertCustomBlock('sectionHeading');
                                  setMoreDropdownOpen(false);
                                }}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold transition-colors"
                              >
                                <div className="w-5 h-5 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-600 text-[10px] font-extrabold">H</div>
                                Section Heading
                              </button>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Fullscreen focus toggle */}
                      <div className="ml-auto flex items-center">
                        <button
                          type="button"
                          onClick={() => setIsFullscreen(!isFullscreen)}
                          className={`p-1.5 rounded-lg hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors ${
                            isFullscreen ? 'text-brandBlue dark:text-brandSky bg-white/60 dark:bg-slate-800/60' : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                          }`}
                          title="Toggle Fullscreen Focus"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Visual Editor Content Area */}
                    <div 
                      className={`relative p-3 bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/80 ${isFullscreen ? 'fixed inset-0 z-[9999] bg-slate-900/95 backdrop-blur-2xl p-10 flex flex-col justify-start' : ''}`}
                    >
                      {isFullscreen && (
                        <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                          <span className="text-white font-bold text-sm">Editorial Focus Mode</span>
                          <button
                            type="button"
                            onClick={() => setIsFullscreen(false)}
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
                          >
                            Exit Focus Mode
                          </button>
                        </div>
                      )}
                      
                      <div 
                        ref={editorRef}
                        contentEditable={true}
                        onInput={handleVisualInput}
                        onClick={handleEditorClick}
                        onPaste={handlePaste}
                        className={`blog-content-area min-h-[380px] outline-none overflow-y-auto p-4 bg-slate-50/30 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/50 rounded-xl text-slate-900 dark:text-slate-105 ${
                          isFullscreen ? 'max-w-4xl mx-auto w-full bg-slate-950/50 p-8 rounded-2xl border border-slate-800 flex-1' : 'max-h-[500px]'
                        }`}
                      />

                      {/* Floating Link Action Popover */}
                      {activeLinkPopover && (
                        <div
                          style={{ top: `${activeLinkPopover.top}px`, left: `${activeLinkPopover.left}px` }}
                          className="absolute z-50 flex items-center gap-1.5 p-1.5 bg-slate-900/95 dark:bg-slate-850/95 text-white backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl text-xs animate-fadeIn"
                        >
                          <span className="max-w-[180px] truncate text-[11px] text-slate-300 font-mono pl-1.5" title={activeLinkPopover.url}>
                            {activeLinkPopover.url}
                          </span>
                          <div className="h-4 w-[1px] bg-slate-700 mx-0.5" />
                          <button
                            type="button"
                            onClick={() => {
                              const testUrl = activeLinkPopover.url.startsWith('/') 
                                ? activeLinkPopover.url 
                                : activeLinkPopover.url.startsWith('http') 
                                  ? activeLinkPopover.url 
                                  : `https://${activeLinkPopover.url}`;
                              window.open(testUrl, '_blank', 'noopener,noreferrer');
                            }}
                            className="p-1 hover:bg-slate-800 text-brandSky hover:text-white rounded-lg transition-colors flex items-center gap-1 text-[10px] font-bold px-1.5"
                            title="Open / Test Link in New Tab"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Open
                          </button>
                          <button
                            type="button"
                            onClick={() => openLinkModal(activeLinkPopover.element)}
                            className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors flex items-center gap-1 text-[10px] font-bold px-1.5"
                            title="Edit Link"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUnlink(activeLinkPopover.element)}
                            className="p-1 hover:bg-red-950/60 text-red-400 hover:text-red-300 rounded-lg transition-colors flex items-center gap-1 text-[10px] font-bold px-1.5"
                            title="Remove Link"
                          >
                            <Unlink className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveLinkPopover(null)}
                            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                            title="Close"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <textarea name="content" value={form.content} onChange={handleChange} placeholder="<h2>Section Title</h2><p>Your article content...</p>" rows={15} className={`${inputCls} resize-y min-h-[350px] font-mono text-[11px] bg-white/45 dark:bg-slate-950/20`} />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-5">
          {/* Publishing */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="font-headline font-extrabold text-sm text-slate-800 dark:text-white">Publishing</h3>
            <div>
              <label className={labelCls}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputCls}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Category</label>
              {showCustomCategoryInput ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={customCategory} 
                      onChange={(e) => setCustomCategory(e.target.value)} 
                      placeholder="New category name..." 
                      className={`${inputCls} flex-1`}
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        if (customCategory.trim()) {
                          const formatted = customCategory.trim();
                          setCategoriesList(prev => {
                            if (!prev.includes(formatted)) {
                              return [...prev, formatted];
                            }
                            return prev;
                          });
                          setForm(prev => ({ ...prev, category: formatted }));
                          setCustomCategory('');
                          setShowCustomCategoryInput(false);
                        }
                      }}
                      className="px-3 py-1 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl text-xs font-bold shadow-sm"
                    >
                      Add
                    </button>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setShowCustomCategoryInput(false)}
                    className="text-[10px] font-bold text-slate-400 hover:text-slate-650 dark:hover:text-slate-200"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
                    {categoriesList.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowCustomCategoryInput(true)}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-brandSky hover:underline mt-1"
                  >
                    <Plus className="w-3 h-3" /> Create custom category
                  </button>
                </div>
              )}
            </div>
            <div>
              <label className={labelCls}>Published Date</label>
              <input name="publishedDate" value={form.publishedDate} onChange={handleChange} placeholder="e.g. June 15, 2026" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Reading Time</label>
              <input name="readingTime" value={form.readingTime} onChange={handleChange} placeholder="e.g. 6 min read" className={inputCls} />
            </div>
          </div>

          {/* Media */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="font-headline font-extrabold text-sm text-slate-800 dark:text-white">Featured Image</h3>
            <div>
              <label className={labelCls}>Image URL</label>
              <input name="featuredImage" value={form.featuredImage} onChange={handleChange} placeholder="https://..." className={inputCls} />
            </div>
            {form.featuredImage && (
              <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <img src={form.featuredImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Author */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="font-headline font-extrabold text-sm text-slate-800 dark:text-white">Author</h3>
            <div>
              <label className={labelCls}>Select Doctor</label>
              <select value={form.author?.name || ''} onChange={handleAuthorSelect} className={inputCls}>
                <option value="">Choose author...</option>
                {doctors.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>
            {form.author?.name && (
              <div className="p-3 bg-white/30 dark:bg-slate-950/40 rounded-xl border border-white/40 dark:border-slate-800/80 shadow-sm">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{form.author.name}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{form.author.qualification}</p>
              </div>
            )}
          </div>

          {/* SEO */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="font-headline font-extrabold text-sm text-slate-800 dark:text-white">SEO Settings</h3>
            <div>
              <label className={labelCls}>SEO Title</label>
              <input name="seoTitle" value={form.seoTitle || ''} onChange={handleChange} placeholder="Meta title..." className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>SEO Description</label>
              <textarea name="seoDescription" value={form.seoDescription || ''} onChange={handleChange} placeholder="Meta description..." rows={2} className={`${inputCls} resize-y`} />
            </div>
            <div>
              <label className={labelCls}>Focus Keywords</label>
              <input name="focusKeywords" value={form.focusKeywords || ''} onChange={handleChange} placeholder="e.g. clear aligners cost" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Secondary Keywords</label>
              <input name="secondaryKeywords" value={form.secondaryKeywords || ''} onChange={handleChange} placeholder="e.g. dental braces, invisible aligners" className={inputCls} />
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal Dialog */}
      {imageModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 relative mx-4">
            <h3 className="font-headline font-extrabold text-sm text-slate-900 dark:text-white">Insert Image</h3>
            
            <div className="flex bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-100 dark:border-slate-850">
              <button
                type="button"
                onClick={() => setImageTab('url')}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-colors ${
                  imageTab === 'url' ? 'bg-white dark:bg-slate-850 text-slate-800 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-650'
                }`}
              >
                Image URL
              </button>
              <button
                type="button"
                onClick={() => setImageTab('upload')}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-colors ${
                  imageTab === 'upload' ? 'bg-white dark:bg-slate-850 text-slate-800 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-650'
                }`}
              >
                Upload Local File
              </button>
            </div>

            {imageTab === 'url' ? (
              <div className="space-y-2 text-left">
                <label className={labelCls}>Image Link URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  id="img_url_input"
                  className={inputCls}
                />
              </div>
            ) : (
              <div className="space-y-2 text-left">
                <label className={labelCls}>Choose Image File</label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 cursor-pointer hover:border-brandSky dark:hover:border-brandSky/60 transition-colors">
                  <svg className="w-8 h-8 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                  </svg>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Select Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLocalImageSelect}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* Layout Style Selection */}
            <div className="space-y-2 text-left">
              <label className={labelCls}>Layout Style</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedLayout('full')}
                  className={`px-3 py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider border transition-all text-center cursor-pointer ${
                    selectedLayout === 'full'
                      ? 'border-brandSky bg-brandSky/10 text-brandSky shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-750 dark:hover:text-slate-350'
                  }`}
                >
                  Just Image
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLayout('left')}
                  className={`px-3 py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider border transition-all text-center cursor-pointer ${
                    selectedLayout === 'left'
                      ? 'border-brandSky bg-brandSky/10 text-brandSky shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-750 dark:hover:text-slate-350'
                  }`}
                >
                  Img Left
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLayout('right')}
                  className={`px-3 py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider border transition-all text-center cursor-pointer ${
                    selectedLayout === 'right'
                      ? 'border-brandSky bg-brandSky/10 text-brandSky shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-750 dark:hover:text-slate-350'
                  }`}
                >
                  Img Right
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              {imageTab === 'url' && (
                <button
                  type="button"
                  onClick={() => {
                    const inputEl = document.getElementById('img_url_input');
                    if (inputEl && inputEl.value.trim()) {
                      handleImageUrlInsert(inputEl.value.trim());
                    }
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Insert Image
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Link Modal Dialog */}
      {linkModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4 relative mx-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-brandBlue/10 dark:bg-brandBlue/20 flex items-center justify-center text-brandBlue dark:text-brandSky">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-headline font-extrabold text-sm text-slate-900 dark:text-white">
                    {editingLinkNodeRef.current ? 'Edit Link' : 'Insert Link'}
                  </h3>
                  <p className="text-[10px] text-slate-400">Add an external link or internal website page</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Link Text */}
            <div className="space-y-1.5">
              <label className={labelCls}>Text to Display</label>
              <input
                type="text"
                value={linkFormData.text}
                onChange={(e) => setLinkFormData(prev => ({ ...prev, text: e.target.value }))}
                placeholder="e.g. anti-dandruff treatment in Chennai"
                className={inputCls}
              />
            </div>

            {/* Link URL */}
            <div className="space-y-1.5">
              <label className={labelCls}>Destination URL / Path</label>
              <input
                type="text"
                value={linkFormData.url}
                onChange={(e) => setLinkFormData(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://... or /treatments/anti-dandruff-treatment"
                className={inputCls}
                autoFocus
              />
            </div>

            {/* Quick Website Interlink Suggestions */}
            <div className="space-y-2 pt-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                ⚡ Quick Website Interlinks (Click to Select)
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1.5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-100 dark:border-slate-800/80">
                {WEBSITE_INTERLINKS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setLinkFormData(prev => ({
                        ...prev,
                        url: item.url,
                        text: prev.text || item.label
                      }));
                    }}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all text-left flex items-center gap-1 ${
                      linkFormData.url === item.url
                        ? 'bg-brandBlue text-white border-brandBlue shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brandSky hover:text-brandBlue'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Target blank toggle */}
            <div className="flex items-center gap-2 pt-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={linkFormData.openInNewTab}
                  onChange={(e) => setLinkFormData(prev => ({ ...prev, openInNewTab: e.target.checked }))}
                  className="rounded border-slate-300 text-brandBlue focus:ring-brandSky w-4 h-4"
                />
                Open link in new tab (target="_blank")
              </label>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              {editingLinkNodeRef.current ? (
                <button
                  type="button"
                  onClick={() => handleUnlink(editingLinkNodeRef.current)}
                  className="px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Unlink className="w-3.5 h-3.5" />
                  Remove Link
                </button>
              ) : <div />}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLinkModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveLink}
                  disabled={!linkFormData.url.trim()}
                  className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all ${
                    linkFormData.url.trim()
                      ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white hover:shadow-lg active:scale-95'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {editingLinkNodeRef.current ? 'Update Link' : 'Insert Link'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
