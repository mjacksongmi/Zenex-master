import bcrypt from "bcryptjs";

export var hash = (value) => bcrypt.hashSync(value, bcrypt.genSaltSync(10));

export var getSignOnInfo = (remember, version) => {
    const signon = new Date;
    const start = new Date;
    const expiration = ((d) => {
        d = new Date(
            d.setTime(d.getTime() + (
                remember === "true" ?
                    // 1 year
                    1000 * 60 * 60 * 24 * 365 :
                    // 10 days
                    1000 * 60 * 60 * 24 * 10
            )
            )
        );
        return d;
    })(start);
    return { signon, expiration, version };
};
export var getActivationEmail = (user) => {
    const style = `color:royalblue;font-weight:bold;text-decoration:underline`;
    const href = `http://zenexint.com/account/activate?username=${user.username}&activation=${user.activation}`;
    return `<div> 
        <div>
            Thank you for visiting ZenexInt.com.
            Your account at ZenexInt.com has been created.
            You must activate your account by clicking the link below before you can successfully login.
        </div>
        <br />
        <br />
        <div>
            <a style='${style}' href='${href}'>Click Here to Activate</a>
        </div>
    </div>`;
};
export const buildProductDocumentFiles = (ItemCode: string, digits: number = 6) => [
    {
        url: `/files/sds/${ItemCode.substr(0, digits)}.pdf`,
        name: 'SDS',
        text: {
            mobile: 'SDS',
            desktop: 'SDS (Safety Data Sheet)'
        },
        target: '_blank',
        type: 'PDF'
    },
    {
        url: `/files/idf/${ItemCode.substr(0, digits)}.pdf`,
        name: 'IDF',
        text: {
            mobile: 'IDF',
            desktop: 'IDF (Ingredient Disclosure Form)'
        },
        target: '_blank',
        type: 'PDF'
    },
    {
        url: `/files/pds/${ItemCode.substr(0, digits)}.pdf`,
        name: 'PDS',
        text: {
            mobile: 'PDS',
            desktop: 'PDS (Product Data Sheet)'
        },
        target: '_blank',
        type: 'PDF',
    },    
];
export const sorts = {
    "byCartQty": (order) => (field) => (a, b) => {
        var a1 = typeof order.items.filter(data => a.ItemCode == data.ItemCode)[0] !== ('undefined' || 'null') &&
            order.items.filter(data => a.ItemCode == data.ItemCode)[0][field] || 0;
        var b1 = typeof order.items.filter(data => b.ItemCode == data.ItemCode)[0] !== ('undefined' || 'null') &&
            order.items.filter(data => b.ItemCode == data.ItemCode)[0][field] || 0;
        return (b1 - a1);
    },
    "byOrdersCount": (index, field) => (field) => {
        var resolve = obj => index[obj[field]] && index[obj[field]].ordersCount || null;
        return (a, b) => ((resolve(b) || -1) - (resolve(a) || -1));
    },
    "byDate": (dateField) => (a, b) => (a[dateField] && b[dateField]) && (b[dateField] - a[dateField]),
    "byNumber": (numberField) => (a, b) => (b[numberField] && a[numberField]) && (Number(b[numberField]) - Number(a[numberField])),
    "byText": (textField) => (a, b) => (a[textField] < b[textField]) && -1 || (a[textField] > b[textField]) && 1 || 0
};