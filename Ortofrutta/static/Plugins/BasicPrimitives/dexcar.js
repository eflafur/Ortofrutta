function loadTree(element) {

    return jQuery(element).orgDiagram({
        items: [
          { id: 0, parent: null, title: "Scott Aasrud", description: "VP, Public Sector", image: "demo/images/photos/a.png" },
          { id: 1, parent: 0, title: "Ted Lucas", description: "VP, Human Resources", image: "demo/images/photos/b.png" },
          { id: 2, parent: 0, title: "Joao Stuger", description: "Business Solutions, US", image: "demo/images/photos/c.png" }
        ],
        cursorItem: 0,
        hasSelectorCheckbox: primitives.common.Enabled.True
    });
}