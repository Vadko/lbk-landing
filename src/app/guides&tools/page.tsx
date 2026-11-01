import type { Metadata } from "next";
import type { Messages } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("guidesTools");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "https://lbklauncher.com/guides&tools",
    },
  };
}

interface DocsSection {
  id: keyof Messages["guidesTools"]["sections"];
  items: {
    linkUrl: string;
    id: keyof Messages["guidesTools"]["items"];
  }[];
}

const docsList: DocsSection[] = [
  {
    id: "guides",
    items: [
      {
        linkUrl: "https://ukrainizer.netlify.app/",
        id: "basics",
      },
      {
        linkUrl: "https://hikarosato.github.io/guide/",
        id: "addons",
      },
      {
        linkUrl:
          "https://medium.com/@hikaro/%D0%B4%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F-%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%97-%D1%8F%D0%BA-%D0%BE%D0%BA%D1%80%D0%B5%D0%BC%D0%BE%D1%97-%D0%BC%D0%BE%D0%B2%D0%B8-%D0%B2-%D1%96%D0%B3%D1%80%D0%B8-%D0%BD%D0%B0-unreal-engine-4-5-120d44c73d3f",
        id: "unrealModding",
      },
      {
        linkUrl:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=3023518241",
        id: "unityTmpFonts",
      },
      {
        linkUrl:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=3322671285",
        id: "unityFontDetection",
      },
      {
        linkUrl: "https://www.youtube.com/watch?v=RBDyfcDiprc",
        id: "gimpTextures",
      },
    ],
  },
  {
    id: "programs",
    items: [
      {
        linkUrl:
          "https://hikarosato.github.io/?utm_source=web&utm_medium=lbk&utm_campaign=hello-guy",
        id: "unityUnrealTools",
      },
      {
        linkUrl: "https://github.com/bartlomiejduda/ImageHeat",
        id: "imageHeat",
      },
      {
        linkUrl: "https://github.com/PanVena/SteamAchievementLocalizer",
        id: "achievementLocalizer",
      },
      {
        linkUrl:
          "https://www.intel.com/content/www/us/en/developer/articles/tool/intel-texture-works-plugin.html",
        id: "textureTools",
      },
    ],
  },
  {
    id: "dictionaries",
    items: [
      {
        linkUrl:
          "https://docs.google.com/spreadsheets/d/1p0H6dFzah3INkemHXGju_tjvbXzpYnbOyNzJLzCWGrQ",
        id: "gameTerminology",
      },
      {
        linkUrl: "https://www.urbandictionary.com/",
        id: "englishDictionary1",
      },
      {
        linkUrl: "https://www.merriam-webster.com/",
        id: "englishDictionary2",
      },
      {
        linkUrl: "https://www.vocabulary.com/",
        id: "englishDictionary3",
      },
      {
        linkUrl: "https://slovnyk.ua/index.php",
        id: "ukrainianDictionary1",
      },
      {
        linkUrl: "https://goroh.pp.ua/",
        id: "ukrainianDictionary2",
      },
      {
        linkUrl:
          "https://chtyvo.org.ua/authors/Stavytska_Lesia/Ukrainska_mova_bez_tabu_Slovnyk_netsenzurnoi_leksyky_ta_ii_vidpovidnykiv/",
        id: "profanityDictionary",
      },
      {
        linkUrl:
          "https://library.nlu.edu.ua/POLN_TEXT/Slovnuk/etymolog_slovnyk_tom2.pdf",
        id: "etymologyDictionary",
      },
      {
        linkUrl:
          "https://uk.everybodywiki.com/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D0%9A%D1%96%D1%80%D0%BD%D0%BE%D1%81%D0%BE%D0%B2%D0%BE%D1%97%E2%80%94%D0%A6%D1%96%D1%81%D0%B0%D1%80",
        id: "chineseTranscription",
      },
      {
        linkUrl:
          "https://steamcommunity.com/groups/UkrainianTranslation/discussions/0/2264691750499622777/",
        id: "interjections",
      },
      {
        linkUrl:
          "https://uk.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D1%84%D1%80%D0%B0%D0%BD%D1%86%D1%83%D0%B7%D1%8C%D0%BA%D0%B8%D1%85_%D1%96%D0%BC%D0%B5%D0%BD",
        id: "frenchNames",
      },
      {
        linkUrl:
          "https://uk.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BD%D1%96%D0%BC%D0%B5%D1%86%D1%8C%D0%BA%D0%B8%D1%85_%D1%96%D0%BC%D0%B5%D0%BD",
        id: "germanNames",
      },
      {
        linkUrl:
          "https://uk.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D1%96%D1%81%D0%BF%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D1%85_%D1%96%D0%BC%D0%B5%D0%BD",
        id: "spanishNames",
      },
      {
        linkUrl:
          "http://uk.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D1%96%D1%82%D0%B0%D0%BB%D1%96%D0%B9%D1%81%D1%8C%D0%BA%D0%B8%D1%85_%D1%96%D0%BC%D0%B5%D0%BD",
        id: "italianNames",
      },
      {
        linkUrl:
          "https://uk.wikipedia.org/wiki/%D0%94%D0%BE%D0%B2%D1%96%D0%B4%D0%BA%D0%B0:%D0%A0%D0%B5%D0%BA%D0%BE%D0%BC%D0%B5%D0%BD%D0%B4%D0%B0%D1%86%D1%96%D1%97_%D1%89%D0%BE%D0%B4%D0%BE_%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B0%D1%87%D1%96_%D1%96%D0%BD%D1%88%D0%BE%D0%BC%D0%BE%D0%B2%D0%BD%D0%B8%D1%85_%D0%B2%D0%BB%D0%B0%D1%81%D0%BD%D0%B8%D1%85_%D0%BD%D0%B0%D0%B7%D0%B2",
        id: "romanceTransliteration",
      },
      {
        linkUrl:
          "https://uk.wikipedia.org/wiki/%D0%94%D0%BE%D0%B2%D1%96%D0%B4%D0%BA%D0%B0:%D0%9D%D1%96%D0%BC%D0%B5%D1%86%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%B0_%D0%BF%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D1%87%D0%BD%D0%B0_%D1%82%D1%80%D0%B0%D0%BD%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D1%86%D1%96%D1%8F",
        id: "germanTransliteration",
      },
      {
        linkUrl:
          "https://uk.wikipedia.org/wiki/%D0%AF%D0%BF%D0%BE%D0%BD%D1%81%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D1%96_%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B8_%D1%82%D1%80%D0%B0%D0%BD%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D1%86%D1%96%D1%97_%D1%82%D0%B0_%D1%82%D1%80%D0%B0%D0%BD%D1%81%D0%BB%D1%96%D1%82%D0%B5%D1%80%D0%B0%D1%86%D1%96%D1%97",
        id: "japaneseTransliteration",
      },
      {
        linkUrl:
          "https://uk.everybodywiki.com/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D0%9A%D1%96%D1%80%D0%BD%D0%BE%D1%81%D0%BE%D0%B2%D0%BE%D1%97%E2%80%94%D0%A6%D1%96%D1%81%D0%B0%D1%80",
        id: "chineseTransliteration",
      },
      {
        linkUrl:
          "https://docs.google.com/document/d/1PMsU2nPdckgJ3W2sFpu793t02Kl8qD5H86aTXLah3n0/edit?usp=sharing",
        id: "koreanTranscription",
      },
      {
        linkUrl:
          "https://docs.google.com/document/d/1MOFhsMYshc24AAjKJzDJe_C9ObDW7r1a4Odg8Vl9Mqc/edit?usp=sharing",
        id: "koreanSoundsTable",
      },
      {
        linkUrl: "https://github.com/Ajatt-Tools/kitsunekko-mirror/tree/main",
        id: "japaneseSubtitles",
      },
      {
        linkUrl:
          "https://chtyvo.org.ua/authors/Bondarenko_Ivan/Yaponsko-ukrainskyi_slovnyk/",
        id: "japaneseDictionary",
      },
      {
        linkUrl: "https://drive.proton.me/urls/00XBYG781R#esyy30rLVjFY",
        id: "lacki23Dictionaries",
      },
    ],
  },
];

export default async function InfoPage() {
  const t = await getTranslations("guidesTools");

  return (
    <>
      <section className="container page-hero">
        <h1 className="hero-title">{t("title")}</h1>
        <p className="hero-description">{t("description")}</p>
      </section>
      {docsList.map((section) => (
        <section key={section.id} className="container section-margin">
          <h2>{t(`sections.${section.id}`)}</h2>
          <ul className="info-list">
            {section.items.map((item) => (
              <li key={item.id}>
                <a
                  href={item.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-list-item glass-bg"
                >
                  {t(`items.${item.id}`)}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
