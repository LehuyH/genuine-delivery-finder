const router = {
    element: document.querySelector("#viewManager"),

    get currentView() {
        return this.element.querySelector(".is-view.current-view");
    },

    go(viewName) {
        let animateOut = false;

        // Perform checks only if existing view:
        if (this.currentView) {
            animateOut = true;

            // Return early if new view = old view:
            if (this.currentView.dataset.name === viewName) return;

            // Hide original view:
            this.currentView.style.opacity = 0;
            setTimeout((function () {
                this.currentView.classList.remove("current-view");
            }).bind(this), 245)
        }

        // Set & show new view:
        setTimeout((function () {
            // Show new page callback:
            this.onShow[viewName] && this.onShow[viewName]();

            this.element.querySelector(`[data-name="${viewName}"]`)
                .classList.add("current-view");
            this.element.querySelector(`[data-name="${viewName}"]`)
                .style.opacity = 1;
        }).bind(this), 245);
    },
    onShow: {}
};

router.go("Search");

