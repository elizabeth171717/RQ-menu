import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants/constants";

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

  if (loading) {
    return (
      <p style={{ textAlign: "center" }}>
        Loading menu...
      </p>
    );
  }

  if (!menu || !menu.sections) {
    return (
      <p style={{ textAlign: "center" }}>
        No menu available
      </p>
    );
  }

  return (
 
      <div>
        <h1>HI I SHOULD ALWAYS SHOW</h1>
        </div>

  );
}

export default Menu;