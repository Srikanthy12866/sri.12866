import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      "home": "Home",
      "portfolio": "Products",
      "products": "Products",
      "about": "About",
      "contact": "Contact",
      "Resume": "Resume",

      // Home Page
      "about_me": "About me",
      "my_portfolio": "My Products",
      "my_products": "Products",
      "contact_me": "Contact Me",
      "i_love_coding": "I love coding",
      "i_code_cool_websites": "I code cool websites",
      "i_develop_mobile_apps": "I develop mobile apps",

      // About Page
      "about_me_title": "About me",
      "a_bit_about_myself": "a bit about myself",
      "about_description": "Software Engineer with experience in Warehouse Management Systems (WMS), Inventory & Order Management. Skilled in building microservices and RESTful APIs with Java and Spring Boot, and responsive frontends using React.js and Redux. Experienced in database design with MySQL and applying best practices across the SDLC.",
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

      // Products / Portfolio
      "portfolio_title": "Products & Systems",
      "products_title": "Products & Systems",
      "products_subtitle": "Deep hardware diagnostic & real-time telemetry tools engineered for Ubuntu and Linux.",
      "view_project": "Quick View",
      "quick_view": "Quick View",
      "view_code": "GitHub",
      "architecture_overview": "Architecture & Engineering",
      "key_capabilities": "Key Capabilities",
      "tech_stack": "Technologies",
      "all_categories": "All Categories",
      "search_products": "Search products or tech stack...",
      "no_products_found": "No matching products found",
      "reset_filters": "Reset Filters",

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
      "portfolio": "ఉత్పత్తులు",
      "products": "ఉత్పత్తులు",
      "about": "గురించి",
      "contact": "సంప్రదించండి",
      "Resume": "రెజ్యూమ్",

      // Home Page
      "about_me": "నా గురించి",
      "my_portfolio": "నా ఉత్పత్తులు",
      "my_products": "ఉత్పత్తులు",
      "contact_me": "నన్ను సంప్రదించండి",
      "i_love_coding": "నాకు కోడింగ్ ఇష్టం",
      "i_code_cool_websites": "నేను బాగా వెబ్‌సైట్‌లు కోడ్ చేస్తాను",
      "i_develop_mobile_apps": "నేను మొబైల్ యాప్‌లు అభివృద్ధి చేస్తాను",

      // About Page
      "about_me_title": "నా గురించి",
      "a_bit_about_myself": "నా గురించి కొంచెం",
      "about_description": "నేను బెంగళూరులో ఉన్న డెడికేటెడ్ ఫుల్-స్టాక్ డెవలపర్, వేర్‌హౌస్ మేనేజ్‌మెంట్ సిస్టమ్స్ (WMS), ఇన్వెంటరీ మరియు ఆర్డర్ మేనేజ్‌మెంట్‌లో అనుభవం కలిగి ఉన్నాను. జావా, స్ప్రింగ్ బూట్ మైక్రోసర్వీసెస్ మరియు రియాక్ట్ ఆధారిత ఫ్రంటెండ్‌లలో ప్రత్యేకత.",
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

      // Products / Portfolio
      "portfolio_title": "ఉత్పత్తులు & వ్యవస్థలు",
      "products_title": "ఉత్పత్తులు & వ్యవస్థలు",
      "products_subtitle": "ఉబుంటు మరియు లైనక్స్ కోసం రూపొందించబడిన డీప్ హార్డ్‌వేర్ డయాగ్నోస్టిక్స్ మరియు రియల్-టైమ్ టెలిమెట్రీ సాధనాలు.",
      "view_project": "త్వరిత వీక్షణ",
      "quick_view": "త్వరిత వీక్షణ",
      "view_code": "గిట్‌హబ్",
      "architecture_overview": "ఆర్కిటెక్చర్ & ఇంజనీరింగ్",
      "key_capabilities": "కీలక సామర్థ్యాలు",
      "tech_stack": "టెక్నాలజీలు",
      "all_categories": "అన్ని విభాగాలు",
      "search_products": "ఉత్పత్తులు లేదా టెక్నాలజీ వెతకండి...",
      "no_products_found": "సరిపోలే ఉత్పత్తులు కనుగొనబడలేదు",
      "reset_filters": "ఫిల్టర్‌లను రీసెట్ చేయండి",

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
      "portfolio": "उत्पाद",
      "products": "उत्पाद",
      "about": "हमारे बारे में",
      "contact": "संपर्क",
      "Resume": "बायोडाटा",

      // Home Page
      "about_me": "हमारे बारे में",
      "my_portfolio": "मेरे उत्पाद",
      "my_products": "उत्पाद",
      "contact_me": "मुझसे संपर्क करें",
      "i_love_coding": "मुझे कोडिंग पसंद है",
      "i_code_cool_websites": "मैं बढ़िया वेबसाइट कोड करता हूं",
      "i_develop_mobile_apps": "मैं मोबाइल ऐप विकसित करता हूं",

      // About Page
      "about_me_title": "हमारे बारे में",
      "a_bit_about_myself": "हमारे बारे में थोड़ा",
      "about_description": "वेयरहाउस मैनेजमेंट सिस्टम (WMS), इन्वेंट्री और ऑर्डर मैनेजमेंट में अनुभवी सॉफ्टवेयर इंजीनियर। जावा और स्प्रिंग बूट के साथ माइक्रोसर्विसेज और रिएक्ट.जेएस के साथ फ्रंटएंड विकसित करने में माहिर।",
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

      // Products / Portfolio
      "portfolio_title": "उत्पाद और प्रणालियाँ",
      "products_title": "उत्पाद और प्रणालियाँ",
      "products_subtitle": "उबंटू और लिनक्स के लिए निर्मित डीप हार्डवेयर डायग्नोस्टिक्स और रियल-टाइम टेलीमेट्री टूल्स।",
      "view_project": "त्वरित विवरण",
      "quick_view": "त्वरित विवरण",
      "view_code": "गिटहब",
      "architecture_overview": "आर्किटेक्चर और इंजीनियरिंग",
      "key_capabilities": "प्रमुख विशेषताएं",
      "tech_stack": "तकनीकी स्टैक",
      "all_categories": "सभी श्रेणियां",
      "search_products": "उत्पाद या तकनीक खोजें...",
      "no_products_found": "कोई मेल खाने वाला उत्पाद नहीं मिला",
      "reset_filters": "फ़िल्टर रीसेट करें",

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