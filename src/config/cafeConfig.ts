export interface CafeConfig {
  name: string;
  tagline: string;
  subtitle: string;
  phone: string;
  phoneRaw: string;
  whatsappNumber: string; // international format without + or spaces e.g. 919876543210
  whatsappDisplay: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
  };
  maps: {
    embedUrl: string;
    directionsUrl: string;
  };
  social: {
    instagramHandle: string;
    instagramUrl: string;
    facebookUrl?: string;
  };
  hours: {
    days: string;
    timing: string;
    pickupTimeMinutes: number;
  };
  currency: {
    symbol: string;
    code: string;
  };
}

export const CAFE_CONFIG: CafeConfig = {
  name: "CAFE PERFECT ZONE",
  tagline: "Good Food, Great Mood!",
  subtitle: "Fresh food, delicious flavors and refreshing drinks — all in one perfect place.",
  phone: "+91 76665 99406",
  phoneRaw: "7666599406",
  whatsappNumber: "917666599406",
  whatsappDisplay: "+91 76665 99406",
  email: "contact@cafeperfectzone.com",
  address: {
    line1: "Collage Road, Renuka Complex",
    line2: "Near Main Market",
    landmark: "Renuka Complex",
    city: "Chnawad",
    state: "Maharashtra",
    pincode: "423101",
    full: "Collage Road, Renuka Complex, Chnawad",
  },
  maps: {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.4507748645546!2d74.2346164!3d20.330798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdc2b71fff44147%3A0x6f82f80792936790!2sPerfect%20Zone%20Cafe!5e0!3m2!1sen!2sin!4v1724428000000!5m2!1sen!2sin",
    directionsUrl: "https://maps.app.goo.gl/eTTR8FrJrevixehe7",
  },
  social: {
    instagramHandle: "@cafe_perfect_zone",
    instagramUrl: "https://www.instagram.com/cafe_perfect_zone",
    facebookUrl: "https://www.facebook.com/cafeperfectzone",
  },
  hours: {
    days: "Monday – Sunday (All 7 Days)",
    timing: "10:00 AM – 10:30 PM",
    pickupTimeMinutes: 15,
  },
  currency: {
    symbol: "₹",
    code: "INR",
  },
};
