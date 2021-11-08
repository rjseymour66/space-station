/**
 * role="tablist" enforces usability. Ex: if a person makes another 
 * page with tabs, they have to add the role to the ul and lis or 
 * it doesn't work.
 */
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');


tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});


// grab the tab that is in focus
let tabFocus = 0;
function changeTabFocus(e) {

    const keydownLeft = 37;
    const keydownRight = 39;

    // change tabindex of current tab to -1
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);
    }

    // if the right key is pushed, move to the next tab on the right
    if (e.keyCode === keydownRight) {
        tabFocus++;
        if (tabFocus >= tabs.length) {
            tabFocus = 0;
        }
    }

    // if the left key is pushed, move to the next tab on the left
    if (e.keyCode === keydownLeft) {
        tabFocus--;
        if (tabFocus < 0) {
            tabFocus = tabs.length - 1;
        }
    }

    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
}

function changeTabPanel(e) {

    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute('aria-controls');
    const targetImage = targetTab.getAttribute('data-image');

    // step backward through the DOM hierarchy 
    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    // underline on page tab
    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute('aria-selected', false);

    // underline on page tab
    targetTab.setAttribute('aria-selected', true);

    // add hidden to each article
    hideContent(mainContainer, '[role="tabpanel"]');

    // remove hidden from the tab we want to display
    showContent(mainContainer, [`#${targetPanel}`])

    // add hidden to each image
    hideContent(mainContainer, 'picture');

    // remove hidden from the image we want to display
    showContent(mainContainer, [`#${targetImage}`])
}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach(item => item.setAttribute('hidden', true));

    /**
     * Example: 
     * 
     *     mainContainer
     *          .querySelectorAll('[role="tabpanel"]')
     *          .forEach(panel => panel.setAttribute('hidden', true));
     */
}

function showContent(parent, content) {
    parent
        .querySelector(content)
        .removeAttribute('hidden');
    
        /**
         *     mainContainer
         *          .querySelector([`#${targetPanel}`])
         *          .removeAttribute('hidden');
         */
}