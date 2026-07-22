// app/clients/layout.jsx

export const metadata = {
  title: "Global Clients & Strategic Alliances | Aarvi Engineering Services",
  description:
    "Discover Aarvi Engineering's global portfolio of 120+ clients across the Oil & Gas, EPC, Power, and Infrastructure sectors. Delivering excellence for over 37 years.",
  keywords: [
    "engineering clients",
    "EPC contractors",
    "oil and gas engineering partners",
    "infrastructure engineering clients",
    "Aarvi Engineering alliances",
    "global engineering portfolio"
  ],
  openGraph: {
    title: "Global Clients & Strategic Alliances | Aarvi",
    description: "Engineering the world's most critical assets for over 120 global clients.",
    type: "website",
  }
};

export default function ClientsLayout({ children }) {
  return <>{children}</>;
}