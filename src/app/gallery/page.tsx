"use client";

import { useState } from "react";
import { LayoutPanelLeft } from "lucide-react";
import PaletteBox from "@/components/PaletteBox";
import Header from "@/components/Header";
import PaletteShowcase from "@/components/PaletteShowcase";
import { CATEGORIZED_PALETTES } from "@/data/categorized-palettes";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryPage() {
	const [activeCategory, setActiveCategory] = useState<string>("All");
	const [appliedPalette, setAppliedPalette] = useState<string[]>(
		CATEGORIZED_PALETTES[0].palettes[0]
	);
	const [showShowcase, setShowShowcase] = useState(false);

	const categories = ["All", ...CATEGORIZED_PALETTES.map((c) => c.category)];
	const filteredSections =
		activeCategory === "All"
			? CATEGORIZED_PALETTES
			: CATEGORIZED_PALETTES.filter((c) => c.category === activeCategory);

	return (
		<div className="flex flex-col min-h-screen px-4 md:px-16 bg-gray-50">
			<Header />
			<main className="flex-1 py-2 flex flex-row gap-8 relative">
				{/* Animated Showcase on the left */}
				<AnimatePresence>
					{showShowcase && (
						<motion.div
							key="showcase"
							initial={{ x: -380, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: -380, opacity: 0 }}
							transition={{ type: "spring", stiffness: 260, damping: 30 }}
							className="sticky top-24 h-fit flex-shrink-0 min-w-[340px] z-10"
						>
							<PaletteShowcase colors={appliedPalette} />
						</motion.div>
					)}
				</AnimatePresence>
				<div
					className={`flex-1 transition-all duration-300 ${
						showShowcase ? "" : "w-full"
					}`}
				>
					<h1 className="text-4xl font-bold mb-8">Explore Categories</h1>
					{/* Category Filter */}
					<div className="flex flex-wrap gap-3 mb-10 ">
						{categories.map((category) => (
							<button
								key={category}
								className={`px-5 py-2 rounded-2xl text-sm font-medium transition
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
					<AnimatePresence mode="wait">
						{filteredSections.map((section, index) => {
							return (
								<motion.div
									key={section.category}
									className="mb-12"
									initial={{ opacity: 0, y: 24 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -24 }}
									transition={{ duration: 0.2, ease: "easeInOut" }}
								>
									{activeCategory === "All" && (
										<h2 className="text-2xl font-semibold mb-4 text-center">
											{section.category}
										</h2>
									)}
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{section.palettes.map((palette, i) => {
											const isActive = JSON.stringify(appliedPalette) === JSON.stringify(palette);
											return (
												<motion.div
													key={i}
													className="rounded-xl p-4 flex flex-col items-center"
													initial={{ opacity: 0, scale: 0.95 }}
													animate={{ opacity: 1, scale: 1 }}
													exit={{ opacity: 0, scale: 0.95 }}
													transition={{ duration: 0.25 }}
												>
													<PaletteBox
														colors={palette}
														height="8rem"
														onApply={() => {
															if (showShowcase && isActive) {
																setShowShowcase(false); // Hide if already open and active
															} else {
																setAppliedPalette(palette);
																setShowShowcase(true); // Open and apply
															}
														}}
														showLayoutPanelLeft={true}
														isShowcaseOpen={showShowcase}
														isActive={isActive}
													/>
												</motion.div>
											);
										})}
									</div>
								</motion.div>
							);
						})}
					</AnimatePresence>
				</div>
			</main>
		</div>
	);
}