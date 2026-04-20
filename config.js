// supabase config
const SUPABASE_URL = 'https://fxkmanginfisqzmjomji.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4a21hbmdpbmZpc3F6bWpvbWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NjgwNjUsImV4cCI6MjA5MjI0NDA2NX0.sCS6HrZCPyqFMPLJFSFIQO_aUzp75DWfpg1ElVi2cyc';

const TELEGRAM_BOT_TOKEN = '7447671480:AAFtEWOh_y3k5UpIeUnV-5fJdV3L-RlqC6M';
const TELEGRAM_CHAT_ID = '906269717';

const UNIVERSITIES = [
  "University of Dhaka","Bangladesh University of Engineering and Technology","Jahangirnagar University",
  "Bangladesh University of Professionals","Jagannath University","Dhaka University of Engineering and Technology",
  "Bangladesh University of Textiles","Bangabandhu Sheikh Mujib Medical University","Bangladesh University of Health Sciences",
  "National University of Bangladesh","University of Chittagong","Chittagong University of Engineering and Technology",
  "Chittagong Medical University","Chittagong Veterinary and Animal Sciences University",
  "Bangabandhu Sheikh Mujibur Rahman Maritime University","Military Institute of Science and Technology",
  "North South University","BRAC University","Independent University Bangladesh","American International University-Bangladesh",
  "East West University","United International University","Daffodil International University",
  "Ahsanullah University of Science and Technology","Stamford University Bangladesh","Southeast University",
  "University of Liberal Arts Bangladesh","Primeasia University","Green University of Bangladesh",
  "Sonargaon University","City University","World University of Bangladesh",
  "Atish Dipankar University of Science and Technology","International Islamic University Chittagong",
  "Premier University","University of Science and Technology Chittagong","East Delta University",
  "Port City International University","BGC Trust University Bangladesh","Dhaka Medical College",
  "Sir Salimullah Medical College","Shaheed Suhrawardy Medical College","Mugda Medical College",
  "Kurmitola General Hospital Medical College","Bangladesh Medical College","Green Life Medical College",
  "Ad-din Women's Medical College","Ibrahim Medical College","Enam Medical College","City Medical College",
  "Monno Medical College","Chittagong Medical College","Cox's Bazar Medical College","USTC Medical College",
  "BGC Trust Medical College","Parkview Medical College"
];

const ZONES = {
  "Zone 1": { label: "Zone 1 – Mirpur / Kafrul / Cantonment", areas: ["Mirpur","Pallabi","DOHS","Kafrul","Technical","Kallyanpur","Paikpara","Pirerbagh","Shewrapara","Kazipara","Taltola","Ibrahimpur","Kalshi","Matikata","Cantonment","Agargaon"] },
  "Zone 2": { label: "Zone 2 – Narayanganj / Demra corridor", areas: ["Chashara","Mondolpara","Kalibazar","Nitaiganj","Fatullah","Panchabati","Jalkuri","Siddhirganj","Signboard","Chittagong Road","Kanchpur","Madanpur","Bandar"] },
  "Zone 3": { label: "Zone 3 – Uttara / Airport / Gazipur", areas: ["Sector 1-18","Airport","Khilkhet","Nikunjo","Ashkona","Tongi","Gazipur","Abdullahpur","Kamarpara","Faydabad","Dakshinkhan","Uttarkhan","Kawla"] },
  "Zone 4": { label: "Zone 4 – Mohammadpur / Dhanmondi / Farmgate", areas: ["Zigatola","Kalabagan","Mohammadpur","Elephant Road","Panthapath","Farmgate","Hazaribagh","Shankar","Shukrabad","Sobhanbagh","Science Lab","Katabon","Adabor","Shekhertek","Bosila","Shyamoli","Asad Gate","Town Hall"] },
  "Zone 5": { label: "Zone 5 – Gulshan / Banani / Bashundhara", areas: ["Gulshan 1","Gulshan 2","Banani","Baridhara","Bashundhara R/A","Niketon","Mohakhali DOHS","Baridhara DOHS","Nadda","Joar Sahara","Kuril"] },
  "Zone 6": { label: "Zone 6 – Rampura / Banasree / Badda", areas: ["Rampura","Banasree","Aftabnagar","Vatara","North Badda","Middle Badda","Merul Badda","Shahzadpur","Notun Bazar","Satarkul","Meradia","East Rampura","Titas Road"] },
  "Zone 7": { label: "Zone 7 – Moghbazar / Khilgaon / Motijheel-N", areas: ["Moghbazar","Shantinogor","Khilgaon","Basabo","Shahjahanpur","Kakrail","Mouchak","Siddheshwari","Malibag","South Rampura","Goran","Rajarbagh","Eskaton","Bailey Road"] },
  "Zone 8": { label: "Zone 8 – Lalbagh / Motijheel / Keraniganj", areas: ["Wari","Lalbagh","Motijheel","Paltan","Gulistan","Azimpur","New Market","Shahbag","Sutrapur","Sadarghat","Bongshal","Nayabazar","Islampur","Gendaria","Nawabpur","Dilkusha","Fakirapool","Arambagh","Bijoy Nagar","Keraniganj"] },
  "Zone 9": { label: "Zone 9 – Demra / Jatrabari / Donia", areas: ["Sayedabad","Demra","Donia","Shonir Akhra","Matuail","Rayerbagh","Jurain","Konapara","Kajla","Kadamtoli","Dholaipar"] },
  "Zone 10": { label: "Zone 10 – Savar / Ashulia / Gabtoli", areas: ["Ashulia","Gabtoli","Hemayetpur","Savar","Nobinagar","Baipail","DEPZ","Jahangirnagar University area","Amin Bazar","Birulia"] }
};

async function sendSOS(user) {
  const msg = `🚨 SOS ALERT!\n👩 Name: ${user.name}\n📞 WhatsApp: ${user.whatsapp}\n🎓 University: ${user.university}\nTime: ${new Date().toLocaleString('bn-BD')}`;
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg, parse_mode: 'HTML' })
    });
  } catch (e) { console.error('Telegram error', e); }
}

function getUser() {
  try { return JSON.parse(localStorage.getItem('tm_user') || 'null'); } catch { return null; }
}
function requireAuth() {
  const u = getUser();
  if (!u) { window.location.href = 'index.html'; return null; }
  return u;
}
