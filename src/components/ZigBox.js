import React, { useState } from "react";

function ZigBox({ title, description, data, handleNavigation }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="relative w-full bg-black py-20 px-4 border-t border-cyan-500/30">
      <div className="max-w-7xl mx-auto">
        <div className="header text-center mb-20">
          {title && (
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400 heading-glow cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredCard("all")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-400 text-base md:text-lg">
              {description}
            </p>
          )}
        </div>
        <div className="space-y-24">
          {data?.map(({ title, description, image, extraButton, date, wing, isUpcoming, isClub }, index) => {
            if (!isUpcoming || isClub) {
              const position = index % 2 === 0 ? "left" : "right";
              return (
                <div
                  key={index}
                  className={`flex flex-col ${position === "right" ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 group`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Image Section */}
                  <div className="w-full md:w-1/2 flex-shrink-0">
                    <div className="neon-border-glow rounded-lg overflow-hidden h-80 md:h-96">
                      <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full md:w-1/2">
                    {/* Card Title */}
                    <div className="flex flex-row justify-center items-center mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 transition-colors duration-300 group-hover:text-cyan-300 heading-glow text-center">
                        {title}
                      </h3>
                      {wing && (
                        <p className="text-xs md:text-sm px-3 mx-3 text-white bg-cyan-500 rounded-full">
                          {wing}
                        </p>
                      )}
                    </div>
                    {date && (
                      <div className="flex flex-row items-center justify-start mb-4 text-gray-400">
                        <i className="fa-solid fa-calendar-days text-cyan-400"></i>
                        <p className="ml-2 text-sm font-medium">
                          {typeof date === "string" ? date :
                            <>
                              {date.toDate().getDate()}.{date.toDate().getMonth() + 1}.{date.toDate().getFullYear()}
                            </>
                          }
                        </p>
                      </div>
                    )}
                    <div
                      className={`transition-all overflow-hidden ${
                        hoveredCard === "all" || hoveredCard === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                      style={{
                        transitionDuration: "2500ms",
                        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light">
                        {description}
                      </p>
                    </div>
                    {extraButton && (
                      <button
                        className="mt-4 px-6 py-2 border-2 border-cyan-400 text-cyan-400 rounded-lg font-bold hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/50"
                        onClick={() => handleNavigation && handleNavigation(title)}
                      >
                        {extraButton.name}
                      </button>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Highlight section */}
        <div className="pt-16 mt-16 border-t border-cyan-500/30">
          <p className="text-cyan-300 hover:text-cyan-100 transition-colors duration-300 cursor-pointer text-center">
            ▸ Est. January 2006 | NSEC Innovation Hub
          </p>
        </div>
      </div>
    </section>
  );
}

export default ZigBox;
