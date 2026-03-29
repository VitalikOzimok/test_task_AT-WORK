import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/route";
import { useCardStore } from "../../../store/cardStore"; // Импортируем store
import styles from "./dropdownMenu.module.scss";
import ActionMenu from "./../../../assets/icons/ActionMenu.svg";

interface DropdownMenuProps {
  id: number;
  isArchived: boolean;
}

export function DropdownMenu({ id, isArchived }: DropdownMenuProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { archiveCard, unarchiveCard, removeCard } = useCardStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    navigate(`${ROUTES.profile}/${id}`);
    setIsOpen(false);
  };

  const handleArchive = () => {
    archiveCard(id);
    setIsOpen(false);
  };

  const handleUnarchive = () => {
    unarchiveCard(id);
    setIsOpen(false);
  };

  const handleDelete = () => {
    removeCard(id);

    setIsOpen(false);
  };

  const menuItems = isArchived
    ? [{ label: "Активировать", onClick: handleUnarchive }]
    : [
        { label: "Редактировать", onClick: handleEdit },
        { label: "Архивировать", onClick: handleArchive },
        { label: "Скрыть", onClick: handleDelete },
      ];

  return (
    <div className={styles.dropdownContainer} ref={menuRef}>
      <div>
        <button
          onClick={handleToggle}
          className={styles.dropdownTrigger}
          type="button"
          aria-label="Меню"
        >
          <img src={ActionMenu} alt="Меню" />
        </button>
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.itemList}>
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={styles.menuItem}
                onClick={item.onClick}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
