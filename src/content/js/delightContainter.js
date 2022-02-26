/**
 * The container element on top of everything (hopefully)
 *
 * @returns {HTMLDivElement}
 */
export const delightContainer = options => {
    const container = document.createElement('div');
    container.className = 'delightContainer';
    container.style.bottom = (typeof options.bottom !== 'undefined' ? options.bottom : '0');
    container.style.position = (typeof options.position !== 'undefined' ? options.position : 'fixed');
    container.style.width = (typeof options.width !== 'undefined' ? options.width : '100%');
    container.style.height = (typeof options.height !== 'undefined' ? options.height : '100%');
    container.style.zIndex = (typeof options.zIndex !== 'undefined' ? options.zIndex : '10001');
    container.style.display = (typeof options.display !== 'undefined' ? options.display : 'flex');
    container.style.alignItems = (typeof options.alignItems !== 'undefined' ? options.alignItems : 'center');
    container.style.justifyContent = (typeof options.justifyContent !== 'undefined' ? options.justifyContent : 'center');
    return container;
}