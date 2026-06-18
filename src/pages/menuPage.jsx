import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants/constants";
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPhone,
  faClock,
  faLocationDot,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";


const CLIENT_ID = "anahuac";
const RESTAURANT_SLUG = "sample-menu";

function Menu() {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState(null);

  // Fetch menu
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/${CLIENT_ID}/public-menu/${RESTAURANT_SLUG}`
        );

        const data = await res.json();

        setMenu(data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Build sections object
  const sections = {};

  menu?.sections?.forEach((section) => {
    sections[section.section] = [
      ...(section.groups?.flatMap((g) => g.items) || []),
      ...(section.items || []),
    ];
  });

  return (
   
   
      <div className="menu-container">
        {/* Loading */}
        {loading && (
          <p style={{ textAlign: "center" }}>
            Loading menu...
          </p>
        )}

        {/* No Menu */}
        {!loading && (!menu || !menu.sections) && (
          <p style={{ textAlign: "center" }}>
            No menu available
          </p>
        )}

        {/* Menu */}
        {!loading && menu?.sections && (
          <>
            <h1 className="restaurant-name">
              {menu.restaurantName}
            </h1>

<div className="restaurant-info">
<div className="left-box">
  <p className="phone">
    <FontAwesomeIcon icon={faPhone} /> (555) 555-5555
  </p>

  <p>
    <FontAwesomeIcon icon={faClock} /> Mon–Fri 8AM–8PM
  </p>
  </div>
<div className="right-box">
  <p className="location">
    <FontAwesomeIcon icon={faLocationDot} /> 123 street Atlanta, Georgia 30339
  </p>

  <button>
    <FontAwesomeIcon icon={faShareNodes} /> Share Menu
  </button>
  </div>
</div>
            <div className="menu-content">
              {Object.entries(sections).map(
                ([sectionName, items]) => (
                  <section
                    key={sectionName}
                    className="menu-section"
                  >
                    <button
                      className="section-toggle"
                      onClick={() =>
                        setOpenSection(
                          openSection === sectionName
                            ? null
                            : sectionName
                        )
                      }
                    >
                      <span>
                        {sectionName.toUpperCase()}
                      </span>

                      <span className="toggle-icon">
                        {openSection === sectionName
                          ? "−"
                          : "+"}
                      </span>
                    </button>

                    {openSection === sectionName && (
                      <div className="grid">
                        {items.map((item) => (
                          <div
                            key={item.id || item._id}
                            className="option-card"
                          >
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="product-img"
                              />
                            )}

                            <div className="item-details">
                              {/* ONE PRICE */}
                              {item.basePrice != null ? (
                                <>
                                  <div className="price-name">
                                    $
                                    {Number(
                                      item.basePrice
                                    ).toFixed(2)}{" "}
                                    {item.name}
                                  </div>

                                  {item.description && (
                                    <div className="description">
                                      {item.description}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <>
                                  {/* MULTIPLE PRICES */}
                                  <div className="item-name">
                                    {item.name}
                                  </div>

                                  {item.description && (
                                    <div className="description">
                                      {item.description}
                                    </div>
                                  )}

                                  <div className="variants">
                                    {item.modifiers
                                      ?.filter(
                                        (modifier) =>
                                          modifier.type ===
                                          "variant"
                                      )
                                      .map((variant) => (
                                        <div
                                          key={variant.id}
                                          className="variant-row"
                                        >
                                          <span>
                                            {variant.name}
                                          </span>

                                          <span>
                                            $
                                            {Number(
                                              variant.price
                                            ).toFixed(2)}
                                          </span>
                                        </div>
                                      ))}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                )
              )}
            </div>
          </>
        )}
        {menu?.slug && (
  <div className="qr-section">
   {/*<QRCode
      value={`https://qr-user-menu.netlify.app/`}
      size={220}
    /> */}
    
  </div>
)}
      </div>
  
  );
}

export default Menu;