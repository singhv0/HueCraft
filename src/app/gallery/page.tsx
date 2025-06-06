"use client";

import { useState } from "react";
import PaletteBox from "@/components/PaletteBox";
import Header from "@/components/Header";

const CATEGORIZED_PALETTES = [
	{
		category: "Tech Startups",
		palettes: [
			["#007AFF", "#1A1A2E", "#F5F7FA", "#00C8FF", "#2F3542"],
			["#0A84FF", "#2C2C54", "#D1D8E0", "#3C40C6", "#485460"],
			["#0066FF", "#001F3F", "#D9E4EC", "#33A1FD", "#4A5568"],
			["#2684FF", "#172B4D", "#F4F5F7", "#00B8D9", "#42526E"],
			["#3B82F6", "#1E3A8A", "#E5E7EB", "#60A5FA", "#2563EB"],
			["#2196F3", "#0D47A1", "#E3F2FD", "#64B5F6", "#546E7A"],
			["#1D4ED8", "#1E293B", "#F1F5F9", "#60A5FA", "#334155"],
			["#2563EB", "#1D3557", "#F8F9FA", "#43AA8B", "#3F88C5"],
			["#0A66C2", "#0E1E25", "#DCE3EA", "#66B2FF", "#14213D"],
			["#00A8E8", "#003459", "#E9F1FA", "#007EA7", "#00171F"],
		],
	},
	{
		category: "E-commerce",
		palettes: [
			["#FF6F61", "#2B2D42", "#FFF8F0", "#2EC4B6", "#FFCB05"],
			["#F94144", "#F3722C", "#F8961E", "#F9C74F", "#90BE6D"],
			["#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#1D3557"],
			["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"],
			["#FE5F55", "#EEF5DB", "#D6D1B1", "#C7EF00", "#EEF0F2"],
			["#FFC107", "#FF5722", "#FFEB3B", "#FF9800", "#FF7043"],
			["#FDCB6E", "#E17055", "#00B894", "#0984E3", "#6C5CE7"],
			["#FF7F50", "#FFD700", "#40E0D0", "#9FE2BF", "#DE3163"],
			["#FAD02E", "#F28D35", "#F76C5E", "#D83367", "#6A0572"],
			["#FEE440", "#FA7921", "#FE4A49", "#2AB7CA", "#FED766"],
		],
	},
	{
		category: "Wellness & Nature",
		palettes: [
			["#2C5F2D", "#F1EFE7", "#B07B58", "#A8BDA0", "#758E4F"],
			["#A7C957", "#F2E8CF", "#386641", "#6A994E", "#BC4749"],
			["#D9BF77", "#A3B18A", "#588157", "#3A5A40", "#344E41"],
			["#B7B7A4", "#A5A58D", "#6B705C", "#FFE8D6", "#CB997E"],
			["#B5CDA3", "#A4C3B2", "#6B9080", "#CCE3DE", "#EAF4F4"],
			["#A8D5BA", "#F9F7F7", "#F6D6AD", "#F6CAC9", "#F49D6E"],
			["#BFD8AF", "#99C24D", "#2C5F2D", "#6B4226", "#D9BF77"],
			["#A7C7E7", "#F7FBFC", "#B7E4C7", "#52B788", "#40916C"],
			["#B5EAD7", "#E2F0CB", "#FFDAC1", "#FFB7B2", "#FF9AA2"],
			["#B7E4C7", "#95D5B2", "#74C69D", "#52B788", "#40916C"],
		],
	},
	{
		category: "Gaming & Creative",
		palettes: [
			["#9B5DE5", "#00BBF9", "#FEE440", "#1A1A1D", "#F15BB5"],
			["#3A86FF", "#8338EC", "#FF006E", "#FB5607", "#FFBE0B"],
			["#FF61A6", "#6A0572", "#AB83A1", "#F7C59F", "#F4845F"],
			["#2D3142", "#BFC0C0", "#EF8354", "#4F5D75", "#1A1A1D"],
			["#F15BB5", "#FEE440", "#00BBF9", "#00F5D4", "#9B5DE5"],
			["#F72585", "#B5179E", "#7209B7", "#3A0CA3", "#4361EE"],
			["#FFB4A2", "#E5989B", "#B5838D", "#6D6875", "#355070"],
			["#F9C80E", "#F86624", "#EA3546", "#662E9B", "#43BCCD"],
			["#F7B801", "#F18701", "#F35B04", "#2E282A", "#6A0572"],
			["#F15BB5", "#9B5DE5", "#00BBF9", "#00F5D4", "#FEE440"],
		],
	},
	{
		category: "Finance & Banking",
		palettes: [
			["#002147", "#708090", "#D4AF37", "#E0E0E0", "#2E8B57"],
			["#1B263B", "#415A77", "#778DA9", "#E0E1DD", "#0D1B2A"],
			["#003049", "#D62828", "#F77F00", "#FCBF49", "#EAE2B7"],
			["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"],
			["#14213D", "#FCA311", "#E5E5E5", "#A3A3A3", "#000000"],
			["#283618", "#606C38", "#FEFAE0", "#DDA15E", "#BC6C25"],
			["#1A535C", "#4ECDC4", "#F7FFF7", "#FF6B6B", "#FFE66D"],
			["#0B132B", "#1C2541", "#3A506B", "#5BC0BE", "#6FFFE9"],
			["#2D3142", "#4F5D75", "#BFC0C0", "#FFFFFF", "#EF8354"],
			["#22223B", "#4A4E69", "#9A8C98", "#C9ADA7", "#F2E9E4"],
		],
	},
];

export default function GalleryPage() {
	const [activeCategory, setActiveCategory] = useState<string>("All");

	// Get all category names
	const categories = ["All", ...CATEGORIZED_PALETTES.map((c) => c.category)];

	// Filter palettes based on active category
	const filteredSections =
		activeCategory === "All"
			? CATEGORIZED_PALETTES
			: CATEGORIZED_PALETTES.filter(
					(c) => c.category === activeCategory
			  );

	return (
		<div className="flex flex-col min-h-screen px-4 md:px-16 bg-gray-50">
			<Header />
			<main className="flex-1 py-10">
				<h1 className="text-4xl font-bold mb-8">Color Palette Gallery</h1>
				{/* Category Filter */}
				<div className="flex flex-wrap gap-3 mb-10">
					{categories.map((category) => (
						<button
							key={category}
							className={`px-5 py-2 rounded-2xl font-medium transition
                ${
					activeCategory === category
						? "bg-black text-white"
						: "bg-gray-200 text-gray-700 hover:bg-gray-300"
				}
              `}
							onClick={() => setActiveCategory(category)}
						>
							{category}
						</button>
					))}
				</div>
				{/* Palettes */}
				{filteredSections.map((section, index) => (
					<div key={index} className="mb-12">
						{/* Only show category heading if not "All" */}
						{activeCategory === "All" && (
							<h2 className="text-2xl font-semibold mb-4">
								{section.category}
							</h2>
						)}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{section.palettes.map((palette, i) => (
								<div
									key={i}
									className="rounded-xl p-4 flex flex-col items-center"
								>
									<PaletteBox colors={palette} height="8rem" />
								</div>
							))}
						</div>
					</div>
				))}
			</main>
		</div>
	);
}