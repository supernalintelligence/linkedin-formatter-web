import { useState, useEffect } from 'react';
import {
  FileText,
  Copy,
  Share2,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Sparkles,
  Download,
  Send
} from 'lucide-react';
import { 
  markdownToLinkedIn, 
  getPlainText, 
  checkAccessibility, 
  getCharacterCount
} from 'supernal-linkedin-formatter';
import './App.css';

const examples = {
  basic: `# Welcome to LinkedIn Formatter

This is **bold** text and this is *italic* text.

You can also use ***bold italic*** for emphasis!`,
  
  lists: `## My Skills

- JavaScript & TypeScript
- React & Node.js
- System Design
- Team Leadership

## Career Highlights

1. Led team of 10 engineers
2. Built scalable platform
3. Reduced costs by 40%`,
  
  code: `## Tech Stack

We use \`React\` for frontend and \`Node.js\` for backend.

\`\`\`javascript
const greeting = "Hello LinkedIn!";
console.log(greeting);
\`\`\``,
  
  mixed: `# Exciting News!

I'm thrilled to announce that **our product** just hit *1 million users*!

## Key Achievements

- 200% growth in Q1
- Featured in TechCrunch
- ~~Failed experiments~~ → Success!

Check it out: [Visit Site](https://example.com)

\`#innovation #tech #startup\``
};

function App() {
  const [markdown, setMarkdown] = useState(examples.basic);
  const [formatted, setFormatted] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const result = markdownToLinkedIn(markdown);
    setFormatted(result);
  }, [markdown]);

  const accessibility = checkAccessibility(formatted);
  const charCount = getCharacterCount(formatted);

  const getTextWithAttribution = () => {
    if (!formatted) return '';
    
    const sourceUrl = typeof window !== 'undefined' 
      ? window.location.href 
      : 'https://linkedin.tools.supernal.ai';
    
    const attribution = `\n\n---\nFormatted with ${sourceUrl}`;
    return formatted + attribution;
  };

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCopy = async () => {
    try {
      const textToCopy = getTextWithAttribution();
      await navigator.clipboard.writeText(textToCopy);
      showNotification('Copied to clipboard!');
    } catch (err) {
      showNotification('Failed to copy');
    }
  };

  const handleCopyPlain = async () => {
    try {
      const textToCopy = getTextWithAttribution();
      const plain = getPlainText(textToCopy);
      await navigator.clipboard.writeText(plain);
      showNotification('Plain text copied!');
    } catch (err) {
      showNotification('Failed to copy');
    }
  };

  const handleShare = (platform: 'linkedin' | 'twitter' | 'facebook') => {
    const text = getTextWithAttribution();
    const encodedText = encodeURIComponent(text);
    const url = window.location.href;
    
    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?text=${encodedText}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
    };
    
    navigator.clipboard.writeText(text);
    window.open(urls[platform], '_blank');
    showNotification('Text copied! Opening ' + platform + '...');
  };

  const handleClear = () => {
    setMarkdown('');
  };

  const loadExample = (key: keyof typeof examples) => {
    setMarkdown(examples[key]);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="brand">
            <FileText className="brand-icon" size={32} />
            <div>
              <h1 className="brand-title">LinkedIn Formatter</h1>
              <p className="brand-subtitle">Transform Markdown into beautiful LinkedIn posts</p>
            </div>
          </div>
          <div className="header-badge">
            <Sparkles size={16} />
            <span>Powered by Supernal Intelligence</span>
          </div>
        </div>
      </header>

      {/* Top Ad */}
      <div className="ad-container top-ad">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-9555345854497895"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      {/* Main Container */}
      <main className="main-container">
        {/* Editor Grid */}
        <div className="editor-grid">
          {/* Input Panel */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <FileText size={20} />
                <span>Markdown Input</span>
              </div>
              <button className="button button-ghost" onClick={handleClear}>
                Clear
              </button>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Type or paste your Markdown here..."
              spellCheck={false}
              className="editor-textarea"
            />
          </div>

          {/* Output Panel */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <Sparkles size={20} />
                <span>LinkedIn Output</span>
              </div>
            </div>
            <div className="editor-output">
              {formatted || 'Your formatted text will appear here...'}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="actions">
          <button className="button button-primary" onClick={() => handleShare('linkedin')}>
            <Send size={18} />
            <span>Post to LinkedIn</span>
          </button>
          <button className="button button-secondary" onClick={handleCopy}>
            <Copy size={18} />
            <span>Copy Formatted</span>
          </button>
          <button className="button button-secondary" onClick={handleCopyPlain}>
            <Download size={18} />
            <span>Copy Plain Text</span>
          </button>
          <button className="button button-ghost" onClick={() => handleShare('twitter')}>
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <BarChart3 size={20} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Total Characters</div>
              <div className={`stat-value ${charCount.exceedsLimit ? 'warning' : ''}`}>
                {charCount.total.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon success">
              <CheckCircle2 size={20} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Remaining (3,000 limit)</div>
              <div className={`stat-value ${charCount.remaining < 0 ? 'warning' : 'success'}`}>
                {charCount.remaining.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Sparkles size={20} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Unicode Characters</div>
              <div className="stat-value">{charCount.unicode.toLocaleString()}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <BarChart3 size={20} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Unicode Percentage</div>
              <div className="stat-value">
                {accessibility.unicodePercentage.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Warnings */}
        {accessibility.warnings.length > 0 && (
          <div className="warnings">
            <div className="warnings-header">
              <AlertCircle size={20} />
              <span>Accessibility Warnings</span>
            </div>
            <ul className="warnings-list">
              {accessibility.warnings.map((warning: string, i: number) => (
                <li key={i}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Examples */}
        <div className="examples">
          <h3 className="examples-title">Try Examples</h3>
          <div className="examples-grid">
            <button className="example-card" onClick={() => loadExample('basic')}>
              <FileText size={20} />
              <span>Basic Formatting</span>
            </button>
            <button className="example-card" onClick={() => loadExample('lists')}>
              <BarChart3 size={20} />
              <span>Lists</span>
            </button>
            <button className="example-card" onClick={() => loadExample('code')}>
              <FileText size={20} />
              <span>Code Blocks</span>
            </button>
            <button className="example-card" onClick={() => loadExample('mixed')}>
              <Sparkles size={20} />
              <span>Mixed Content</span>
            </button>
          </div>
        </div>

        {/* Bottom Ad */}
        <div className="ad-container bottom-ad">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-9555345854497895"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        {/* Footer */}
        <footer className="footer">
          <p className="footer-description">
            <strong>How it works:</strong> This tool converts Markdown syntax to Unicode Mathematical 
            Alphanumeric Symbols that look like formatted text on LinkedIn. No data is stored or sent 
            to any server—everything happens in your browser.
          </p>
          <div className="footer-links">
            <a href="https://supernal.ai" target="_blank" rel="noopener noreferrer">
              Supernal Intelligence
            </a>
            <span className="divider">•</span>
            <a href="https://github.com/supernalintelligence/linkedin-formatter" target="_blank" rel="noopener noreferrer">
              Open Source
            </a>
            <span className="divider">•</span>
            <a href="https://www.npmjs.com/package/supernal-linkedin-formatter" target="_blank" rel="noopener noreferrer">
              NPM Package
            </a>
            <span className="divider">•</span>
            <span className="privacy-badge">
              <CheckCircle2 size={16} />
              Privacy First
            </span>
          </div>
        </footer>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast">
          <CheckCircle2 size={20} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
