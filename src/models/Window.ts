export const isMobile = () => window.document.body.clientWidth < 641;

export const capitalize = (str) => str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
export const formalize = (str) => str.split(' ').map(s => capitalize(s)).join(' ');
export const pluralize = (str?) => capitalize(str) + "s";

export const getUrlParameterByName = (name, url) => {
    if (!url) { url = window.location.href; }
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) { return null; }
    if (!results[2]) { return ''; }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};
export const kill = e => {
    if (e !== undefined) {
        if (typeof e.preventDefault === 'function') { e.preventDefault(); }
        if (typeof e.stopPropagation === 'function') { e.stopPropagation(); }
    }
};
export const isScrolled = (details?) => {
    let isClient = typeof window !== 'undefined';
    if (isClient) {
        let _scrollTop = window.pageYOffset || document.body.scrollTop;
        return !details ? _scrollTop > 0 : { scroll: window.pageYOffset || document.body.scrollTop, scrolled: _scrollTop > 0 };
    } else {
        return !details ? false : { scroll: window.pageYOffset || document.body.scrollTop, scrolled: false };
    }
};
export const usd = str => {
    str = str || 0;
    str = Number(Number(str).toFixed(2));
    return str.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
export const clearSelection = (e) => {
    const d: any = window.document;
    if (window.document.activeElement.tagName.toLowerCase() !== 'input') {
        if (d.selection) { d.selection.empty(); }
        else if (window.getSelection) { window.getSelection().removeAllRanges(); }
    }
};