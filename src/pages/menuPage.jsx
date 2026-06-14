import React, { useEffect, useState } from "react";

import { BACKEND_URL } from "../constants/constants";

const CLIENT_ID = "anahuac";
const RESTAURANT_SLUG = "rricura-tamales";


function Menu() {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🥇 Initial fetch (load once)
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/${CLIENT_ID}/public-menu/${RESTAURANT_SLUG}`,
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

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading menu...</p>;
  }

  if (!menu || !menu.sections) {
    return <p style={{ textAlign: "center" }}>No menu available</p>;
  }

  return (
    <div className="menu-container">
  
      <div className="menu-content">
        {menu.sections.map((section) => {
          const visibleUngroupedItems = (section.items || []).filter(
            (item) => item.visible !== false,
          );

          return (
            <div key={section.id || section._id}>
              <h2 className="section-name">{section.section}</h2>

              {/* 👇 Render Groups (NEW) */}
              {section.groups &&
                section.groups.length > 0 &&
                section.groups.map((group) => {
                  const visibleGroupItems = (group.items || []).filter(
                    (item) => item.visible !== false,
                  );
                  if (visibleGroupItems.length === 0) return null;

                  return (
                    <div key={group.id || group._id}>
                      <h3 className="group-name">{group.groupName}</h3>
                      <div className="menu-grid">
                        {visibleGroupItems.map((item) => (
                          <div
                            key={item.id || item._id}
                          
                          >
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                              
                              />
                            )}
                            <p>
                              {item.name}
                            </p>
                         
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

              {/* 👇 Render ungrouped items as before */}
              {visibleUngroupedItems.length > 0 && (
                <div className="menu-grid">
                  {visibleUngroupedItems.map((item) => (
                    <div
                      key={item.id || item._id}
                     
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                         
                        />
                      )}
                      <p style={{ marginBottom: "0.5rem" }}>{item.name}</p>
                      
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
