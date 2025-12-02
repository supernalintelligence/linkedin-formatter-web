import { useState, useEffect } from 'react';
import { 
  markdownToLinkedIn, 
  getPlainText, 
  checkAccessibility, 
  getCharacterCount
} from 'supernal-linkedin-formatter';
import './App.css';

// Initialize AdSense on component mount
if (typeof window !== 'undefined') {
  try {
    // @ts-ignore
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {
    console.error('AdSense error:', e);
  }
}

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
  
  mixed: `# 🚀 Exciting News!

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

  useEffect(() => {
    const result = markdownToLinkedIn(markdown);
    setFormatted(result);
  }, [markdown]);

  var accessibility = checkAccessibility(formatted);
  var charCount = getCharacterCount(formatted);

  // Always append source URL for tracking (no opt-out in free version)
  const getTextWithAttribution = () => {
    if (!formatted) return '';
    
    const sourceUrl = typeof window !== 'undefined' 
      ? window.location.href 
      : 'https://linkedin.tools.supernal.ai';
    
    const attribution = `\n\n---\nFormatted with ${sourceUrl}`;
    return formatted + attribution;
  };
  // Recalculate stats based on formatted text (WITHOUT attribution for accurate preview)
  charCount = getCharacterCount(formatted);
  accessibility = formatted ? checkAccessibility(formatted) : { hasUnicodeFormatting: false, unicodeCharCount: 0, plainTextLength: 0, unicodePercentage: 0, warnings: [] };

  const handleCopy = async () => {
    try {
      const textToCopy = getTextWithAttribution(); // Add attribution when copying
      await navigator.clipboard.writeText(textToCopy);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  const handleCopyPlain = async () => {
    try {
      const textToCopy = getTextWithAttribution(); // Add attribution when copying
      const plain = getPlainText(textToCopy);
      await navigator.clipboard.writeText(plain);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  const handleOpenInLinkedIn = async () => {
    try {
      const textToShare = getTextWithAttribution(); // Add attribution when opening LinkedIn
      const encodedText = encodeURIComponent(textToShare);
      const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?text=${encodedText}`;
      await navigator.clipboard.writeText(textToShare);
      window.open(linkedInUrl, '_blank');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      alert('Failed to open LinkedIn. Text copied to clipboard - please paste manually.');
    }
  };

  const handleClear = () => {
    setMarkdown('');
  };

  const loadExample = (key: keyof typeof examples) => {
    setMarkdown(examples[key]);
  };

  return (
    <>
      {/* Header with Branding */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', margin: 0 }}>LinkedIn Formatter</h1>
            <p style={{ fontSize: '0.875rem', margin: '0.25rem 0 0', color: '#6b7280' }}>
              Powered by{' '}
              <a href="https://supernal.ai" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>
                Supernal Intelligence
              </a>
            </p>
          </div>
          <a
            href="https://supernal.ai/tools/linkedin-formatter"
            className="button button-primary"
            style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
          >
            Ad-Free Version →
          </a>
        </div>
      </div>

      {/* Top Ad Banner */}
      <div style={{ maxWidth: '1200px', margin: '1rem auto', textAlign: 'center' }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-9555345854497895"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      <div className="container">
        <header>
          <h1>✨ Markdown to LinkedIn Formatter</h1>
          <p className="subtitle">
            Convert your Markdown to LinkedIn-formatted text instantly. No storage, no tracking, just formatting.
          </p>
        </header>

        <div className="editor-container">
          <div className="panel">
            <div className="panel-header">
              <h2 className="panel-title">📝 Markdown Input</h2>
              <button className="button button-secondary" onClick={handleClear}>
                Clear
              </button>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Type or paste your Markdown here..."
              spellCheck={false}
            />
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2 className="panel-title">✨ LinkedIn Output</h2>
            </div>
            <div className="output">{formatted || 'Your formatted text will appear here...'}</div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="button button-primary" onClick={handleOpenInLinkedIn} title="Copy and open LinkedIn">
            🚀 Open in LinkedIn
          </button>
          <button className="button button-primary" onClick={handleCopy}>
            📋 Copy Formatted
          </button>
          <button className="button button-secondary" onClick={handleCopyPlain}>
            📄 Copy Plain Text
          </button>
        </div>

        <div className="stats">
          <div className="stat-card">
            <div className="stat-label">Total Characters</div>
            <div className={`stat-value ${charCount.exceedsLimit ? 'warning' : ''}`}>
              {charCount.total}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Remaining (LinkedIn Limit)</div>
            <div className={`stat-value ${charCount.remaining < 0 ? 'warning' : 'success'}`}>
              {charCount.remaining}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Unicode Characters</div>
            <div className="stat-value">{charCount.unicode}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Unicode %</div>
            <div className="stat-value">
              {accessibility.unicodePercentage.toFixed(1)}%
            </div>
          </div>
        </div>

        {accessibility.warnings.length > 0 && (
          <div className="warnings">
            <div className="warnings-title">⚠️ Accessibility Warnings</div>
            <ul>
              {accessibility.warnings.map((warning: string, i: number) => (
                <li key={i}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="examples">
          <h3 className="examples-title">📚 Try Examples</h3>
          <div className="example-buttons">
            <button className="example-button" onClick={() => loadExample('basic')}>
              Basic Formatting
            </button>
            <button className="example-button" onClick={() => loadExample('lists')}>
              Lists
            </button>
            <button className="example-button" onClick={() => loadExample('code')}>
              Code Blocks
            </button>
            <button className="example-button" onClick={() => loadExample('mixed')}>
              Mixed Content
            </button>
          </div>
        </div>

        {/* Bottom Ad Banner */}
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-9555345854497895"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        <footer>
          <p>
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
            <span className="privacy-badge">🔒 Privacy First</span>
          </div>
        </footer>
      </div>

      {showToast && (
        <div className="toast">
          ✅ Opening LinkedIn with your formatted text!
        </div>
      )}
    </>
  );
}

export default App;

