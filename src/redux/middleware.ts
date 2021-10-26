export const logger = store => next => action => {

    let result;
    
    if(typeof window === 'undefined') { result = next(action); return result; }
    const groupSupport: boolean = typeof console.groupCollapsed === 'function';
    const startGroup: any = groupSupport ? console.groupCollapsed : console.log;
    const endGroup = () => { if(groupSupport) { console.groupEnd(); } }

    startGroup(`%cRedux Activity`, `color: royalblue`, `--> ${action.type}`);
    
    console.log(`${JSON.stringify(action, null, 2)}`);
    
    result = next(action);
    
    endGroup();

    return result;

};