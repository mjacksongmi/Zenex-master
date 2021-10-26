declare const System;

type TAppComponent = { Store; Routes; Location?; };

type THeaderComponent = {};
type THeaderComponentWithRouter = { match; history; location; };
type TMergedHeaderComponent =
    THeaderComponent &
    THeaderComponentWithRouter &
    { mobile; user; categories; border; dispatch; };

type TAccountComponent = {};
type TMergedAccountComponent =
   TAccountComponent &
   { mobile; dispatch; user; border; } &
   { match; }
   ;

type TProductsComponent = {};
type TProductsWithRouterComonent = { match; location; history; };
type TMergedProductsComponent = TProductsComponent & TProductsWithRouterComonent & { mobile; width; dispatch; categories; catalog; scrollTop; };

type TAboutComponent = {};
type TMergedAboutComponent = {};

type THomeComponent = {};
type TMergedHomeComponent = THomeComponent & { mobile; };

type TCatalogSectionComponent = { href; file; link_title; title; text; image; color; };
type TMergedCatalogSectionComponent = TCatalogSectionComponent & { dispatch; mobile; };

type TServicesComponent = { service; };
type TMergedServicesComponent = TServicesComponent & { dispatch; mobile; };

type TSlider = {};
type TSliderFromState = { mobile; width; };
type TSliderMerged = TSlider & TSliderFromState;

type TPitchesComponent = { additionalData?; };
type TMergedPitchesComponent = TPitchesComponent & { dispatch; mobile; };

interface Window {
   props?;
   store?;
   ___gmi?: {
      clearCache?: (key: string) => void;
      clearAllCache?: () => void;
      getState?: () => any;
      reduxstore?;
      cache?: any | undefined;      
      shouldDeleteCache?: true | undefined;
   }      
}