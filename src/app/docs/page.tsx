import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Посібники та інструменти",
  description:
    "Тут зібрана інформація по інструментам, посібникам та словникам, щоб ви могли себе спробувати.",
  alternates: {
    canonical: "https://lbklauncher.com/guides&tools",
  },
};

const docsList = {
  guides: {
    title: "Посібники до роботи",
    items: [
      {
        linkUrl: "https://ukrainizer.netlify.app/",
        description: "Основа",
      },
      {
        linkUrl: "https://hikarosato.github.io/guide/",
        description: "Доповнення",
      },
      {
        linkUrl:
          "https://medium.com/@hikaro/%D0%B4%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F-%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%97-%D1%8F%D0%BA-%D0%BE%D0%BA%D1%80%D0%B5%D0%BC%D0%BE%D1%97-%D0%BC%D0%BE%D0%B2%D0%B8-%D0%B2-%D1%96%D0%B3%D1%80%D0%B8-%D0%BD%D0%B0-unreal-engine-4-5-120d44c73d3f",
        description: "І модифікація до UE 4-5",
      },
      {
        linkUrl:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=3023518241",
        description: "Заміна TMP-шрифтів у іграх на Unity",
      },
      {
        linkUrl:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=3322671285",
        description: "Виявлення та заміна шрифту у Unity (.ttf/TMP)",
      },
      {
        linkUrl: "https://www.youtube.com/watch?v=RBDyfcDiprc",
        description: "Що роботи з GIMP текстурами",
      },
    ],
  },
  programs: {
    title: "Список програм",
    items: [
      {
        linkUrl:
          "https://hikarosato.github.io/?utm_source=web&utm_medium=lbk&utm_campaign=hello-guy",
        description: "Купа програм по Unity + UE",
      },
      {
        linkUrl: "https://github.com/bartlomiejduda/ImageHeat",
        description: "ImageHeat is a program for viewing encoded textures",
      },
      {
        linkUrl: "https://github.com/PanVena/SteamAchievementLocalizer",
        description: "Steam Achievement Localizer",
      },
      {
        linkUrl:
          "https://www.intel.com/content/www/us/en/developer/articles/tool/intel-texture-works-plugin.html",
        description: "Nvidia Texture Tools",
      },
    ],
  },
  dictionaries: {
    title: "Словники",
    items: [
      {
        linkUrl:
          "https://docs.google.com/spreadsheets/d/1p0H6dFzah3INkemHXGju_tjvbXzpYnbOyNzJLzCWGrQ",
        description: "Відеоігрова та коловідеоігрова термінологія",
      },
      {
        linkUrl: "https://www.urbandictionary.com/",
        description: "Тлумачний словник 1 англійської мови",
      },
      {
        linkUrl: "https://www.merriam-webster.com/",
        description: "Тлумачний словник 2 англійської мови",
      },
      {
        linkUrl: "https://www.vocabulary.com/",
        description: "Тлумачний словник 3 англійської мови",
      },
      {
        linkUrl: "https://slovnyk.ua/index.php",
        description: "Словник 1 української мови",
      },
      {
        linkUrl: "https://goroh.pp.ua/",
        description: "Словник 2 української мови",
      },
      {
        linkUrl:
          "https://chtyvo.org.ua/authors/Stavytska_Lesia/Ukrainska_mova_bez_tabu_Slovnyk_netsenzurnoi_leksyky_ta_ii_vidpovidnykiv/",
        description:
          "Українська мова без табу. Словник нецензурної лексики та її відповідників",
      },
      {
        linkUrl:
          "https://library.nlu.edu.ua/POLN_TEXT/Slovnuk/etymolog_slovnyk_tom2.pdf",
        description: "Етимологічний словник української мови",
      },
      {
        linkUrl:
          "https://uk.everybodywiki.com/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D0%9A%D1%96%D1%80%D0%BD%D0%BE%D1%81%D0%BE%D0%B2%D0%BE%D1%97%E2%80%94%D0%A6%D1%96%D1%81%D0%B0%D1%80",
        description: "Транскрипція китайської мови",
      },
      {
        linkUrl:
          "https://steamcommunity.com/groups/UkrainianTranslation/discussions/0/2264691750499622777/",
        description: "Українські вигуки і звуконаслідувальні слова",
      },
      {
        linkUrl:
          "https://uk.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D1%84%D1%80%D0%B0%D0%BD%D1%86%D1%83%D0%B7%D1%8C%D0%BA%D0%B8%D1%85_%D1%96%D0%BC%D0%B5%D0%BD",
        description: "Список французьких імен",
      },
      {
        linkUrl:
          "https://uk.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BD%D1%96%D0%BC%D0%B5%D1%86%D1%8C%D0%BA%D0%B8%D1%85_%D1%96%D0%BC%D0%B5%D0%BD",
        description: "Список німецьких імен",
      },
      {
        linkUrl:
          "https://uk.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D1%96%D1%81%D0%BF%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D1%85_%D1%96%D0%BC%D0%B5%D0%BD",
        description: "Список іспанських імен",
      },
      {
        linkUrl:
          "http://uk.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D1%96%D1%82%D0%B0%D0%BB%D1%96%D0%B9%D1%81%D1%8C%D0%BA%D0%B8%D1%85_%D1%96%D0%BC%D0%B5%D0%BD",
        description: "Список італійських імен",
      },
      {
        linkUrl:
          "https://uk.wikipedia.org/wiki/%D0%94%D0%BE%D0%B2%D1%96%D0%B4%D0%BA%D0%B0:%D0%A0%D0%B5%D0%BA%D0%BE%D0%BC%D0%B5%D0%BD%D0%B4%D0%B0%D1%86%D1%96%D1%97_%D1%89%D0%BE%D0%B4%D0%BE_%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B0%D1%87%D1%96_%D1%96%D0%BD%D1%88%D0%BE%D0%BC%D0%BE%D0%B2%D0%BD%D0%B8%D1%85_%D0%B2%D0%BB%D0%B0%D1%81%D0%BD%D0%B8%D1%85_%D0%BD%D0%B0%D0%B7%D0%B2",
        description: "Транслітерація романських мов",
      },
      {
        linkUrl:
          "https://uk.wikipedia.org/wiki/%D0%94%D0%BE%D0%B2%D1%96%D0%B4%D0%BA%D0%B0:%D0%9D%D1%96%D0%BC%D0%B5%D1%86%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%B0_%D0%BF%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D1%87%D0%BD%D0%B0_%D1%82%D1%80%D0%B0%D0%BD%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D1%86%D1%96%D1%8F",
        description: "Німецька транслітерація",
      },
      {
        linkUrl:
          "https://uk.wikipedia.org/wiki/%D0%AF%D0%BF%D0%BE%D0%BD%D1%81%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D1%96_%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B8_%D1%82%D1%80%D0%B0%D0%BD%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D1%86%D1%96%D1%97_%D1%82%D0%B0_%D1%82%D1%80%D0%B0%D0%BD%D1%81%D0%BB%D1%96%D1%82%D0%B5%D1%80%D0%B0%D1%86%D1%96%D1%97",
        description: "Японська транслітерація (система Коваленка)",
      },
      {
        linkUrl:
          "https://uk.everybodywiki.com/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D0%9A%D1%96%D1%80%D0%BD%D0%BE%D1%81%D0%BE%D0%B2%D0%BE%D1%97%E2%80%94%D0%A6%D1%96%D1%81%D0%B0%D1%80",
        description: "Китайська транслітерація (система Кірсонова-Цісар)",
      },
      {
        linkUrl:
          "https://docs.google.com/document/d/1PMsU2nPdckgJ3W2sFpu793t02Kl8qD5H86aTXLah3n0/edit?usp=sharing",
        description: "Транскрипція корейської мови",
      },
      {
        linkUrl:
          "https://docs.google.com/document/d/1MOFhsMYshc24AAjKJzDJe_C9ObDW7r1a4Odg8Vl9Mqc/edit?usp=sharing",
        description:
          "Загальна таблиця транслітерування корейських звуків українською мовою",
      },
      {
        linkUrl: "https://github.com/Ajatt-Tools/kitsunekko-mirror/tree/main",
        description: "Субтитри японською",
      },
      {
        linkUrl:
          "https://chtyvo.org.ua/authors/Bondarenko_Ivan/Yaponsko-ukrainskyi_slovnyk/",
        description: "Японсько-український словник",
      },
      {
        linkUrl: "https://drive.proton.me/urls/00XBYG781R#esyy30rLVjFY",
        description: "Словнички від Lacki23",
      },
    ],
  },
};

export default function InfoPage() {
  return (
    <>
      <section className="container page-hero">
        <h1 className="hero-title">Посібники та інструменти</h1>
        <p className="hero-description">
          Тут зібрана інформація по інструментам, посібникам та словникам, щоб
          ви могли себе спробувати.
        </p>
      </section>
      {Object.values(docsList).map((section, index) => (
        <section key={index} className="container section-margin">
          <h2>{section.title}</h2>
          <ul className="info-list">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <a
                  href={item.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-list-item glass-bg"
                >
                  {item.description}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
