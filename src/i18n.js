import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      "home": "Home",
      "portfolio": "Portfolio",
      "about": "About",
      "contact": "Contact",

      // Home Page
      "about_me": "About me",
      "my_portfolio": "My Portfolio",
      "contact_me": "Contact Me",
      "i_love_coding": "I love coding",
      "i_code_cool_websites": "I code cool websites",
      "i_develop_mobile_apps": "I develop mobile apps",

      // About Page
      "about_me_title": "About me",
      "a_bit_about_myself": "a bit about myself",
      "about_description": "I am a dedicated full-stack developer based in Bengaluru, specializing in modern web technologies and mobile app development. With a passion for clean code and user-centric design, I strive to build efficient and scalable solutions that make a difference.",
      "spoken_languages": "Spoken Languages",
      "work_timeline": "Work Timeline",

      // Contact Page
      "get_in_touch": "Get in touch",
      "send": "Send",
      "sending": "Sending...",
      "success_message": "SUCCESS! Thank you for your message",
      "failed_message": "Failed to send! {{error}}",
      "name": "Name",
      "email": "Email",
      "message": "Message",

      // Portfolio
      "portfolio_title": "Portfolio",
      "view_project": "view project",

      // Footer
      "copyright": "copyright",

      // Meta
      "meta_title": "Yepalagunta Srikanth",
      "meta_description": "I’m Yepalagunta Srikanth Full stack developer,currently working in Bengaluru. I love to create simple yet beautiful websites with great user experience."
    }
  },
  te: {
    translation: {
      // Navigation
      "home": "హోమ్",
      "portfolio": "పోర్ట్ఫోలియో",
      "about": "గురించి",
      "contact": "సంప్రదించండి",

      // Home Page
      "about_me": "నా గురించి",
      "my_portfolio": "నా పోర్ట్ఫోలియో",
      "contact_me": "నన్ను సంప్రదించండి",
      "i_love_coding": "నాకు కోడింగ్ ఇష్టం",
      "i_code_cool_websites": "నేను బాగా వెబ్‌సైట్‌లు కోడ్ చేస్తాను",
      "i_develop_mobile_apps": "నేను మొబైల్ యాప్‌లు అభివృద్ధి చేస్తాను",

      // About Page
      "about_me_title": "నా గురించి",
      "a_bit_about_myself": "నా గురించి కొంచెం",
      "about_description": "నేను బెంగళూరులో ఉన్న డెడికేటెడ్ ఫుల్-స్టాక్ డెవలపర్, ఆధునిక వెబ్ టెక్నాలజీలలో ప్రత్యేకత కలిగి ఉన్నాను మరియు మొబైల్ యాప్ డెవలప్‌మెంట్. క్లీన్ కోడ్ మరియు యూజర్-సెంట్రిక్ డిజైన్‌కు ప్యాషన్ ఉన్న నేను, ప్రభావం చేసే సమర్థవంతమైన మరియు స్కేలబుల్ సొల్యూషన్‌లను నిర్మించడానికి ప్రయత్నిస్తాను.",
      "spoken_languages": "మాట్లాడే భాషలు",
      "work_timeline": "పని టైమ్‌లైన్",

      // Contact Page
      "get_in_touch": "సంప్రదించండి",
      "send": "పంపండి",
      "sending": "పంపుతోంది...",
      "success_message": "విజయం! మీ సందేశం కోసం ధన్యవాదాలు",
      "failed_message": "పంపడం విఫలమైంది! {{error}}",
      "name": "పేరు",
      "email": "ఇమెయిల్",
      "message": "సందేశం",

      // Portfolio
      "portfolio_title": "పోర్ట్ఫోలియో",
      "view_project": "ప్రాజెక్ట్ చూడండి",

      // Footer
      "copyright": "కాపీరైట్",

      // Meta
      "meta_title": "యెపలగుంట శ్రీకాంత్",
      "meta_description": "నేను యెపలగుంట శ్రీకాంత్ ఫుల్ స్టాక్ డెవలపర్, ప్రస్తుతం బెంగళూరులో పని చేస్తున్నాను. నేను సింపుల్ అయినా అందమైన వెబ్‌సైట్‌లను బాగా యూజర్ ఎక్స్‌పీరియన్స్‌తో సృష్టించడం ఇష్టపడతాను."
    }
  },
  hi: {
    translation: {
      // Navigation
      "home": "होम",
      "portfolio": "पोर्टफोलियो",
      "about": "हमारे बारे में",
      "contact": "संपर्क",

      // Home Page
      "about_me": "हमारे बारे में",
      "my_portfolio": "मेरा पोर्टफोलियो",
      "contact_me": "मुझसे संपर्क करें",
      "i_love_coding": "मुझे कोडिंग पसंद है",
      "i_code_cool_websites": "मैं बढ़िया वेबसाइट कोड करता हूं",
      "i_develop_mobile_apps": "मैं मोबाइल ऐप विकसित करता हूं",

      // About Page
      "about_me_title": "हमारे बारे में",
      "a_bit_about_myself": "हमारे बारे में थोड़ा",
      "about_description": "मैं बेंगलुरु में स्थित एक समर्पित फुल-स्टैक डेवलपर हूं, जो आधुनिक वेब तकनीकों में विशेषज्ञ हूं और मोबाइल ऐप डेवलपमेंट में माहिर हूं। क्लीन कोड और यूजर-केंद्रित डिजाइन के जुनून के साथ, मैं प्रभावशाली, कुशल और स्केलेबल समाधान बनाने का प्रयास करता हूं।",
      "spoken_languages": "बोली जाने वाली भाषाएं",
      "work_timeline": "कार्य समयरेखा",

      // Contact Page
      "get_in_touch": "संपर्क में रहें",
      "send": "भेजें",
      "sending": "भेजा जा रहा है...",
      "success_message": "सफलता! आपके संदेश के लिए धन्यवाद",
      "failed_message": "भेजने में विफल! {{error}}",
      "name": "नाम",
      "email": "ईमेल",
      "message": "संदेश",

      // Portfolio
      "portfolio_title": "पोर्टफोलियो",
      "view_project": "प्रोजेक्ट देखें",

      // Footer
      "copyright": "कॉपीराइट",

      // Meta
      "meta_title": "यपालगुंट श्रीकांत",
      "meta_description": "मैं यपालगुंट श्रीकांत फुल स्टैक डेवलपर हूं, वर्तमान में बेंगलुरु में काम कर रहा हूं। मुझे सरल लेकिन सुंदर वेबसाइट बनाना पसंद है जिसमें बेहतरीन उपयोगकर्ता अनुभव हो।"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;