// app/industries/layout.jsx

export const metadata = {
  title: "Industries We Serve | Aarvi Engineering Services",
  description:
    "Multi-discipline engineering solutions for Oil & Gas, LNG, Refining, Petrochemicals, Power Generation, Renewable Energy, Process Industries, and Industrial Infrastructure.",
  keywords: [
    "oil and gas engineering",
    "LNG terminal design",
    "refinery engineering",
    "petrochemical plant design",
    "power generation engineering",
    "renewable energy EPC",
    "process industries engineering"
  ],
  openGraph: {
    title: "Industries We Serve | Aarvi Engineering Services",
    description: "Engineering excellence across global industrial sectors.",
    type: "website"
  }
};

export default function IndustriesLayout({ children }) {
  return <>{children}</>;
}