import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

export module css {
    export const categoryLinksJar = { textAlign: "right" };
    export const categoryLink = {
        display: "block", 
        padding: "9px 13px 9px 0", 
        fontSize: "13px", 
        fontWeight: "bold", 
        margin: "0 3px",
    };
    export const categoryLinkSelected = {
        ...categoryLink,
        backgroundColor: "#242424",
        color: "#fff",
        MsBoxShadow: "0 0 2px #242424",
        WebkitBoxShadow: "0 0 2px #242424",
        MozBoxShadow: "0 0 2px #242424",
        boxShadow: "0 0 2px #242424",
        textShadow: "1px 1px 4px #000",
        borderRadius: "4px"
    };
    export const subcategoryLinksJar = {
        textAlign: "right", 
        paddingBottom: "9px",
        margin: "3px 3px 0 3px",
        border: "dotted 1px #545454",
        backgroundColor: "#efefef" 
    };
    export const subcategoryLink = {
        fontWeight: "bold",
        margin: "0 3px",
        display: "block",    
        backgroundColor: "transparent",
        color: "inherit",
        textShadow: "none",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "transparent",
        padding: "5px 15px",
        marginTop: "5px",
        fontSize: "12px"
    };
    export const subcategoryLinkSelected = {
        borderRadius: "4px",
        fontWeight: "bold",
        margin: "0 3px",
        display: "block",
        backgroundColor: "#fff",
        color: "inherit",
        textShadow: "none",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "transparent",
        padding: "5px 15px",
        marginTop: "5px",
        fontSize: "12px",
        boxShadow: "0 0 5px #999",
        MsBoxShadow: "0 0 5px #999",
        WebkitBoxShadow: "0 0 5px #999",
        MozBoxShadow: "0 0 5px #999"
    };
}

export const Categories: React.FC<{ dispatch; categories; catalog; match; scrolled; }> = ({ categories, catalog, match, scrolled, }) => {

   var { item } = catalog;
   var { Category, Subcategory } = item || match.params;

   return <>
        <div style={{ padding: "13px 0"  }}>
            {
                categories.map((category, index) => {
                    var { backgroundColor, subcategories } = category;
                    var currentCategory = category.name === Category;                                    
                    return <div key={index} style={css.categoryLinksJar as any}>
                        <Link to={`/products/category/${category.name}`} style={{
                            ...(currentCategory ? css.categoryLinkSelected : css.categoryLink),
                            ...(currentCategory ? { backgroundColor } : {}) as any }}>
                            {category.alias || category.name}
                        </Link>                                      
                        {
                            currentCategory && 
                            subcategories && 
                            subcategories.length > 0 && 
                            <div style={css.subcategoryLinksJar as any}>
                                {
                                    subcategories.map((subcategory, index) => {
                                        var currentSubcategory = subcategory.name === Subcategory;
                                        return <Link key={index} to={`/products/category/${category.name}/${subcategory.name}`}
                                            style={currentSubcategory ? { 
                                                ...css.subcategoryLinkSelected, 
                                                ...{ color: backgroundColor } as any
                                            } : css.subcategoryLink }>
                                            {subcategory.alias || subcategory.name}
                                        </Link>;
                                    })
                                }
                            </div>
                        }
                    </div>;
                })
            }
        </div>
   </>;

};

export const mapState = state => ({
    mobile: state.settings.mobile,
    catalog: state.catalog,
    categories: state.categories,
    scrolled: state.settings.scrolled,
});
export const mapDispatch = dispatch => ({ dispatch });

export default withRouter(connect(mapState, mapDispatch)(Categories as any)) as React.FC<{ goPage; }> & any;