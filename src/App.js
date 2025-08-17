import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Copy, Download, Upload } from 'lucide-react';
import './index.css';
import './tailwind.css';
const App = () => {
  const [prompts, setPrompts] = useState([
    {
      id: 1,
      name: "ניתוח נתונים ביולוגיים",
      category: "ביואינפורמטיקה",
      prompt: "אנא נתח את רשימת הגנים הבאה ובצע עבורה enrichment analysis. התמקד בתהליכים ביולוגיים עיקריים ובמסלולים רלוונטיים. הגנים הם: [GENES_LIST]",
      tags: ["גנים", "ניתוח", "enrichment"]
    },
    {
      id: 2,
      name: "סיכום מאמר מחקר",
      category: "אקדמיה",
      prompt: "סכם את המאמר הבא בצורה מקצועית, כלול: מטרת המחקר, שיטות, תוצאות עיקריות ומסקנות. שמור על דיוק מדעי: [ARTICLE_TEXT]",
      tags: ["סיכום", "מחקר", "אקדמיה"]
    },
    {
      id: 3,
      name: "הסבר טכנולוגי פשוט",
      category: "חינוך",
      prompt: "הסבר את הנושא הבא בצורה פשוטה וברורה, כאילו אתה מסביר לתלמיד בתיכון. השתמש בדוגמאות מהחיים: [TOPIC]",
      tags: ["הסבר", "חינוך", "פשטות"]
    },
    {
      id: 4,
      name: "מדריך מעשי לסוכני בינה מלאכותית",
      category: "בינה מלאכותית",
      prompt: "האבולוציה הבאה בבינה מלאכותית כבר כאן. בינה מלאכותית סוכנת היא סוג של בינה מלאכותית שנועדה לתפקד באופן אוטונומי. אבל במה זה שונה מבינה מלאכותית מסורתית ובינה מלאכותית גנרטיבית? בינה מלאכותית סוכנת יכולה לקבל החלטות, לבצע משימות ולהסתגל לסביבתה ללא התערבות אנושית מתמדת כדי להפוך מגוון רחב יותר של משימות לאוטומטיות עם פיקוח מינימלי. מהם סוכני בינה מלאכותית וכיצד הם שונים מבינה מלאכותית מסורתית ובינה מלאכותית גנרטיבית היתרונות העיקריים של הטכנולוגיה, מקרי שימוש לפי פונקציה עסקית ותעשייה, וסיפורי הצלחה בעולם האמיתי שיקולים קריטיים לאבטחה, תאימות ופריסת בינה מלאכותית אתית חמישה שיקולים למפת דרכים מעשית להטמעת בינה מלאכותית סוכנית בארגון שלך: [TOPIC]",
      tags: ["הסבר", "בינה מלאכותית"]
    },
     {
    "id": 5,
    name: "מבנה תגובה לדוגמה",
    category: "הנחיית סוכן בינה מלאכותית",
    prompt: "אתה עוזר ידידותי ומועיל. ענה בעברית בצורה קצרה וברורה. המשימה שלך היא להגיב לפניות משתמשים בצורה פשוטה, ולהבטיח שהמידע יהיה מדויק וקל להבנה. והתגובה צריכה להיות מובנית בפורמט ברור והגיוני, עם הקדמה קצרה ולאחריה עיקרי הדברים ומסקנה במידת הצורך.",
    tags: ["הסבר", "בינה מלאכותית"]
  }
  ]);

  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('הכל');
  const [newPrompt, setNewPrompt] = useState({
    name: '',
    category: '',
    prompt: '',
    tags: ''
  });

  const categories = ['הכל', ...new Set(prompts.map(p => p.category))];

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.tags.some(tag => tag.includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'הכל' || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addPrompt = () => {
    if (newPrompt.name && newPrompt.prompt) {
      const prompt = {
        id: Date.now(),
        name: newPrompt.name,
        category: newPrompt.category || 'כללי',
        prompt: newPrompt.prompt,
        tags: newPrompt.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      setPrompts([...prompts, prompt]);
      setNewPrompt({ name: '', category: '', prompt: '', tags: '' });
      setIsEditing(false);
    }
  };

  const editPrompt = (prompt) => {
    setNewPrompt({
      name: prompt.name,
      category: prompt.category,
      prompt: prompt.prompt,
      tags: prompt.tags.join(', ')
    });
    setSelectedPrompt(prompt);
    setIsEditing(true);
  };

  const updatePrompt = () => {
    if (selectedPrompt && newPrompt.name && newPrompt.prompt) {
      setPrompts(prompts.map(p => 
        p.id === selectedPrompt.id 
          ? {
              ...p,
              name: newPrompt.name,
              category: newPrompt.category || 'כללי',
              prompt: newPrompt.prompt,
              tags: newPrompt.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            }
          : p
      ));
      setNewPrompt({ name: '', category: '', prompt: '', tags: '' });
      setSelectedPrompt(null);
      setIsEditing(false);
    }
  };

  const deletePrompt = (id) => {
    setPrompts(prompts.filter(p => p.id !== id));
  };

  const copyPrompt = async (prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      alert('הPrompt הועתק בהצלחה!');
    } catch (err) {
      console.error('שגיאה בהעתקה:', err);
    }
  };

  const exportPrompts = () => {
    const dataStr = JSON.stringify(prompts, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'prompts.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importPrompts = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedPrompts = JSON.parse(e.target.result);
          setPrompts([...prompts, ...importedPrompts]);
          alert('הPrompts יובאו בהצלחה!');
        } catch (err) {
          alert('שגיאה בייבוא הקובץ');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">מנהל Prompts</h1>
        <p className="text-gray-600">נהל וארגן את ה-prompts שלך למודלי AI</p>
      </div>

      {/* כלי חיפוס וסינון */}
      <div className="mb-6 flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-lg">
        <input
          type="text"
          placeholder="חפש prompts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus size={16} />
          הוסף Prompt
        </button>
        <button
          onClick={exportPrompts}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
        >
          <Download size={16} />
          ייצא
        </button>
        <label className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center gap-2 cursor-pointer">
          <Upload size={16} />
          ייבא
          <input
            type="file"
            accept=".json"
            onChange={importPrompts}
            className="hidden"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* רשימת Prompts */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Prompts קיימים ({filteredPrompts.length})</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredPrompts.map((prompt) => (
              <div key={prompt.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">{prompt.name}</h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => copyPrompt(prompt)}
                      className="p-1 text-gray-500 hover:text-blue-500"
                      title="העתק"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      onClick={() => editPrompt(prompt)}
                      className="p-1 text-gray-500 hover:text-yellow-500"
                      title="ערוך"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => deletePrompt(prompt.id)}
                      className="p-1 text-gray-500 hover:text-red-500"
                      title="מחק"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded mb-2">
                  {prompt.category}
                </span>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{prompt.prompt}</p>
                <div className="flex flex-wrap gap-1">
                  {prompt.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* טופס הוספה/עריכה */}
        {isEditing && (
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {selectedPrompt ? 'ערוך Prompt' : 'הוסף Prompt חדש'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">שם הPrompt</label>
                <input
                  type="text"
                  value={newPrompt.name}
                  onChange={(e) => setNewPrompt({...newPrompt, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="לדוגמה: ניתוח נתונים מדעיים"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">קטגוריה</label>
                <input
                  type="text"
                  value={newPrompt.category}
                  onChange={(e) => setNewPrompt({...newPrompt, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="לדוגמה: מדעים, טכנולוgiה, חינוך"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">הPrompt</label>
                <textarea
                  value={newPrompt.prompt}
                  onChange={(e) => setNewPrompt({...newPrompt, prompt: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
                  placeholder="כתוב את הPrompt שלך כאן... השתמש ב-[PLACEHOLDER] למקומות שצריך למלא"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">תגיות (מופרדות בפסיקים)</label>
                <input
                  type="text"
                  value={newPrompt.tags}
                  onChange={(e) => setNewPrompt({...newPrompt, tags: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="לדוגמה: ניתוח, מדעים, AI"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={selectedPrompt ? updatePrompt : addPrompt}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {selectedPrompt ? 'עדכן' : 'הוסף'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedPrompt(null);
                    setNewPrompt({ name: '', category: '', prompt: '', tags: '' });
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  בטל
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* הוראות שימוש */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">איך להשתמש:</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• השתמש ב-[PLACEHOLDER] כדי לסמן מקומות שצריך למלא בPrompt</li>
          <li>• לחץ על כפתור ההעתקה כדי להעתיק prompt ישירות</li>
          <li>• ייצא וייבא prompts כדי לשתף עם אחרים</li>
          <li>• השתמש בחיפוש ובסינון כדי למצוא prompts בקלות</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
