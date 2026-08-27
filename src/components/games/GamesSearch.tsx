"use client";

import { faSteam } from "@fortawesome/free-brands-svg-icons/faSteam";
import { faArrowDownAZ } from "@fortawesome/free-solid-svg-icons/faArrowDownAZ";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons/faArrowDownWideShort";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons/faCalendarPlus";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons/faMicrophone";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { faTrophy } from "@fortawesome/free-solid-svg-icons/faTrophy";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faWrench } from "@fortawesome/free-solid-svg-icons/faWrench";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { trackViewTranslatorsPage } from "@/lib/analytics";

interface GamesSearchProps {
  value: string;
  onChange: (value: string) => void;
  // Multi-select statuses
  selectedStatuses: string[];
  onStatusesChange: (statuses: string[]) => void;
  // Multi-select authors
  selectedAuthors: string[];
  onAuthorsChange: (authors: string[]) => void;
  // Available authors list
  authors: string[];
  authorsLoading?: boolean;
  // Sort by
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  // Has voice-over filter
  hasVoice: boolean;
  onVoiceChange: (hasVoice: boolean) => void;
  // Has achievements filter
  hasAchievements: boolean;
  onAchievementsChange: (hasAchievements: boolean) => void;

  fromWorkshop: boolean;
  onWorkshopChange: (fromWorkshop: boolean) => void;
  // Clear statuses, voice and achievements together
  onClearStatusFilters: () => void;
}

const AUTHORS_PER_PAGE = 20;

const STATUS_OPTIONS = [
  { value: "completed", label: "Готово", icon: faCheckCircle },
  { value: "in-progress", label: "У розробці", icon: faSpinner },
  { value: "planned", label: "Заплановано", icon: faClock },
  { value: "tech-improvement", label: "Технічна доробка", icon: faWrench },
];

const SORT_OPTIONS = [
  { value: "name", label: "За назвою", icon: faArrowDownAZ },
  {
    value: "created_at",
    label: "За датою додавання",
    icon: faCalendarPlus,
  },
  {
    value: "latest_updated_at",
    label: "За новизною",
    icon: faClockRotateLeft,
  },
  {
    value: "downloads",
    label: "За популярністю",
    icon: faDownload,
  },
];

export function GamesSearch({
  value,
  onChange,
  selectedStatuses,
  onStatusesChange,
  selectedAuthors,
  onAuthorsChange,
  authors,
  authorsLoading,
  sortBy,
  onSortChange,
  hasVoice,
  onVoiceChange,
  hasAchievements,
  onAchievementsChange,
  fromWorkshop,
  onWorkshopChange,
  onClearStatusFilters,
}: GamesSearchProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [authorSearch, setAuthorSearch] = useState("");
  const [authorsDisplayed, setAuthorsDisplayed] = useState(AUTHORS_PER_PAGE);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const authorDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const authorListRef = useRef<HTMLDivElement>(null);
  const authorSearchInputRef = useRef<HTMLInputElement>(null);

  // Filter authors based on search
  const filteredAuthors = useMemo(() => {
    if (!authorSearch.trim()) {
      return authors;
    }
    const search = authorSearch.toLowerCase();
    return authors.filter((a) => a.toLowerCase().includes(search));
  }, [authors, authorSearch]);

  // Paginated authors to display
  const visibleAuthors = useMemo(() => {
    return filteredAuthors.slice(0, authorsDisplayed);
  }, [filteredAuthors, authorsDisplayed]);

  const hasMoreAuthors = useMemo(() => {
    return authorsDisplayed < filteredAuthors.length;
  }, [authorsDisplayed, filteredAuthors.length]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isAuthorOpen && authorSearchInputRef.current) {
      authorSearchInputRef.current.focus();
    }
  }, [isAuthorOpen]);

  // Handle search input change with pagination reset
  const handleAuthorSearchChange = useCallback((newValue: string) => {
    setAuthorSearch(newValue);
    setAuthorsDisplayed(AUTHORS_PER_PAGE);
  }, []);

  // Handle dropdown toggle with reset
  const handleAuthorDropdownToggle = useCallback(() => {
    if (isAuthorOpen) {
      setAuthorSearch("");
      setAuthorsDisplayed(AUTHORS_PER_PAGE);
    } else {
      trackViewTranslatorsPage();
    }
    setIsAuthorOpen(!isAuthorOpen);
  }, [isAuthorOpen]);

  // Infinite scroll handler for authors
  const handleAuthorScroll = useCallback(() => {
    if (!authorListRef.current || !hasMoreAuthors) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = authorListRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setAuthorsDisplayed((prev) => prev + AUTHORS_PER_PAGE);
    }
  }, [hasMoreAuthors]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusOpen(false);
      }
      if (
        authorDropdownRef.current &&
        !authorDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAuthorOpen(false);
        setAuthorSearch("");
        setAuthorsDisplayed(AUTHORS_PER_PAGE);
      }
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle status selection
  const handleStatusToggle = (statusValue: string) => {
    if (selectedStatuses.includes(statusValue)) {
      onStatusesChange(selectedStatuses.filter((s) => s !== statusValue));
    } else {
      onStatusesChange([...selectedStatuses, statusValue]);
    }
  };

  // Toggle author selection
  const handleAuthorToggle = (authorName: string) => {
    if (selectedAuthors.includes(authorName)) {
      onAuthorsChange(selectedAuthors.filter((a) => a !== authorName));
    } else {
      onAuthorsChange([...selectedAuthors, authorName]);
    }
  };

  // Clear all statuses and the voice/achievements filters grouped with them
  const handleClearStatuses = () => {
    onClearStatusFilters();
    setIsStatusOpen(false);
  };

  // Clear all authors
  const handleClearAuthors = () => {
    onAuthorsChange([]);
    setIsAuthorOpen(false);
  };

  // Status button label (also covers voice/achievements grouped in the same dropdown)
  const statusLabel = useMemo(() => {
    const total =
      selectedStatuses.length +
      (hasVoice ? 1 : 0) +
      (hasAchievements ? 1 : 0) +
      (fromWorkshop ? 1 : 0);
    if (total === 0) {
      return "Усі стани";
    }
    if (total === 1) {
      if (selectedStatuses.length === 1) {
        const opt = STATUS_OPTIONS.find((o) => o.value === selectedStatuses[0]);
        return opt?.label || selectedStatuses[0];
      }
      if (hasVoice) {
        return "Озвучення";
      }
      return hasAchievements ? "Досягнення" : "З Майстерні Steam";
    }
    return `${total} фільтри`;
  }, [selectedStatuses, hasVoice, hasAchievements, fromWorkshop]);

  // Author button label
  const authorLabel = useMemo(() => {
    if (selectedAuthors.length === 0) {
      return "Усі автори";
    }
    if (selectedAuthors.length === 1) {
      return selectedAuthors[0];
    }
    return `${selectedAuthors.length} авторів`;
  }, [selectedAuthors]);

  // Sort button label
  const sortLabel = useMemo(() => {
    const option = SORT_OPTIONS.find((o) => o.value === sortBy);
    return option?.label || "За назвою";
  }, [sortBy]);

  return (
    <div className="games-filters-wrapper">
      <div className="games-filters">
        <div className="search-wrapper">
          <SvgIcon icon={faMagnifyingGlass} />
          <input
            type="search"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            name="search"
            placeholder="Пошук ігор..."
            className="search-input"
          />
          {localValue && (
            <button
              type="button"
              className="input-clear"
              onClick={() => setLocalValue("")}
              aria-label="Очистити пошук"
            >
              <SvgIcon icon={faXmark} />
            </button>
          )}
        </div>

        {/* Status Multi-Select Dropdown (also groups voice/achievements filters) */}
        <div className="custom-dropdown" ref={statusDropdownRef}>
          <button
            type="button"
            className={`dropdown-trigger ${isStatusOpen ? "open" : ""} ${selectedStatuses.length > 0 || hasVoice || hasAchievements || fromWorkshop ? "has-value" : ""}`}
            onClick={() => setIsStatusOpen(!isStatusOpen)}
          >
            <SvgIcon icon={faGamepad} />
            <span>{statusLabel}</span>
            <SvgIcon
              icon={faChevronDown}
              className={`dropdown-arrow ${isStatusOpen ? "rotated" : ""}`}
            />
          </button>

          {isStatusOpen && (
            <div className="dropdown-menu dropdown-menu-with-search">
              {/* Clear selection */}
              {(selectedStatuses.length > 0 || hasVoice || hasAchievements) && (
                <button
                  type="button"
                  className="dropdown-item dropdown-item-clear"
                  onClick={handleClearStatuses}
                >
                  <SvgIcon icon={faXmark} />
                  <span>Очистити фільтр</span>
                </button>
              )}
              {STATUS_OPTIONS.map((option) => {
                const isSelected = selectedStatuses.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`dropdown-item dropdown-item-checkbox ${isSelected ? "active" : ""}`}
                    onClick={() => handleStatusToggle(option.value)}
                  >
                    <span className={`checkbox ${isSelected ? "checked" : ""}`}>
                      {isSelected && <SvgIcon icon={faCheck} />}
                    </span>
                    <SvgIcon icon={option.icon} />
                    <span>{option.label}</span>
                  </button>
                );
              })}
              <div className="dropdown-divider" />
              <button
                type="button"
                className={`dropdown-item dropdown-item-checkbox ${hasVoice ? "active" : ""}`}
                onClick={() => onVoiceChange(!hasVoice)}
              >
                <span className={`checkbox ${hasVoice ? "checked" : ""}`}>
                  {hasVoice && <SvgIcon icon={faCheck} />}
                </span>
                <SvgIcon icon={faMicrophone} />
                <span>Озвучення</span>
              </button>
              <button
                type="button"
                className={`dropdown-item dropdown-item-checkbox ${hasAchievements ? "active" : ""}`}
                onClick={() => onAchievementsChange(!hasAchievements)}
              >
                <span
                  className={`checkbox ${hasAchievements ? "checked" : ""}`}
                >
                  {hasAchievements && <SvgIcon icon={faCheck} />}
                </span>
                <SvgIcon icon={faTrophy} />
                <span>Досягнення</span>
              </button>
              <button
                type="button"
                className={`dropdown-item dropdown-item-checkbox ${fromWorkshop ? "active" : ""}`}
                onClick={() => onWorkshopChange(!fromWorkshop)}
              >
                <span className={`checkbox ${fromWorkshop ? "checked" : ""}`}>
                  {fromWorkshop && <SvgIcon icon={faCheck} />}
                </span>
                <SvgIcon icon={faSteam} />
                <span>З Майстерні Steam</span>
              </button>
            </div>
          )}
        </div>

        {/* Author Multi-Select Dropdown */}
        <div className="custom-dropdown" ref={authorDropdownRef}>
          <button
            type="button"
            className={`dropdown-trigger ${isAuthorOpen ? "open" : ""} ${selectedAuthors.length > 0 ? "has-value" : ""}`}
            onClick={handleAuthorDropdownToggle}
          >
            <SvgIcon icon={faUser} />
            <span>{authorLabel}</span>
            <SvgIcon
              icon={faChevronDown}
              className={`dropdown-arrow ${isAuthorOpen ? "rotated" : ""}`}
            />
          </button>

          {isAuthorOpen && (
            <div className="dropdown-menu dropdown-menu-with-search">
              {/* Search Input */}
              <div className="dropdown-search">
                <SvgIcon icon={faMagnifyingGlass} />
                <input
                  ref={authorSearchInputRef}
                  type="search"
                  value={authorSearch}
                  onChange={(e) => handleAuthorSearchChange(e.target.value)}
                  placeholder="Пошук автора..."
                  className="dropdown-search-input"
                />
                {authorSearch && (
                  <button
                    type="button"
                    className="input-clear"
                    onClick={() => setAuthorSearch("")}
                  >
                    <SvgIcon icon={faXmark} />
                  </button>
                )}
              </div>

              {/* Clear selection */}
              {selectedAuthors.length > 0 && !authorSearch && (
                <button
                  type="button"
                  className="dropdown-item dropdown-item-clear"
                  onClick={handleClearAuthors}
                >
                  <SvgIcon icon={faXmark} />
                  <span>Очистити фільтр ({selectedAuthors.length})</span>
                </button>
              )}

              {/* Scrollable List */}
              <div
                ref={authorListRef}
                className="dropdown-list"
                onScroll={handleAuthorScroll}
              >
                {authorsLoading ? (
                  <div className="dropdown-loading">
                    <div className="spinner spinner-small" />
                  </div>
                ) : visibleAuthors.length === 0 ? (
                  <div className="dropdown-empty">
                    <span>Автора не знайдено</span>
                  </div>
                ) : (
                  <>
                    {visibleAuthors.map((authorName) => {
                      const isSelected = selectedAuthors.includes(authorName);
                      return (
                        <button
                          key={authorName}
                          type="button"
                          className={`dropdown-item dropdown-item-checkbox ${isSelected ? "active" : ""}`}
                          onClick={() => handleAuthorToggle(authorName)}
                        >
                          <span
                            className={`checkbox ${isSelected ? "checked" : ""}`}
                          >
                            {isSelected && <SvgIcon icon={faCheck} />}
                          </span>
                          <SvgIcon icon={faUser} />
                          <span>{authorName}</span>
                        </button>
                      );
                    })}
                    {hasMoreAuthors && (
                      <div className="dropdown-loading">
                        <div className="spinner spinner-small" />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Results Count */}
              {!authorsLoading && authors.length > 0 && (
                <div className="dropdown-footer">
                  <span>
                    {authorSearch
                      ? `Знайдено: ${filteredAuthors.length}`
                      : `Усього: ${authors.length}`}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="custom-dropdown" ref={sortDropdownRef}>
          <button
            type="button"
            className={`dropdown-trigger ${isSortOpen ? "open" : ""}`}
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            <SvgIcon icon={faArrowDownWideShort} />
            <span>{sortLabel}</span>
            <SvgIcon
              icon={faChevronDown}
              className={`dropdown-arrow ${isSortOpen ? "rotated" : ""}`}
            />
          </button>

          {isSortOpen && (
            <div className="dropdown-menu dropdown-menu-with-search dropdown-menu--right">
              {SORT_OPTIONS.map((option) => {
                const isSelected = sortBy === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`dropdown-item ${isSelected ? "active" : ""}`}
                    onClick={() => {
                      onSortChange(option.value);
                      setIsSortOpen(false);
                    }}
                  >
                    <SvgIcon icon={option.icon} />
                    <span>{option.label}</span>
                    {isSelected && (
                      <SvgIcon icon={faCheck} className="dropdown-item-check" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Selected filters chips - outside of flex container */}
      {(selectedStatuses.length > 0 ||
        selectedAuthors.length > 0 ||
        hasVoice ||
        hasAchievements) && (
        <div className="filters-chips">
          {selectedStatuses.map((s) => {
            const opt = STATUS_OPTIONS.find((o) => o.value === s);
            return (
              <span key={s} className="filter-chip">
                {opt?.label || s}
                <button
                  type="button"
                  onClick={() => handleStatusToggle(s)}
                  className="filter-chip-remove"
                >
                  <SvgIcon icon={faXmark} />
                </button>
              </span>
            );
          })}
          {selectedAuthors.map((a) => (
            <span key={a} className="filter-chip filter-chip-author">
              {a}
              <button
                type="button"
                onClick={() => handleAuthorToggle(a)}
                className="filter-chip-remove"
              >
                <SvgIcon icon={faXmark} />
              </button>
            </span>
          ))}
          {hasVoice && (
            <span className="filter-chip">
              Озвучення
              <button
                type="button"
                onClick={() => onVoiceChange(false)}
                className="filter-chip-remove"
              >
                <SvgIcon icon={faXmark} />
              </button>
            </span>
          )}
          {hasAchievements && (
            <span className="filter-chip">
              Досягнення
              <button
                type="button"
                onClick={() => onAchievementsChange(false)}
                className="filter-chip-remove"
              >
                <SvgIcon icon={faXmark} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
