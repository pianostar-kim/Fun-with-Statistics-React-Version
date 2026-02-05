import {useRef} from "react";

function AccessibilityToggler() {
    const accessibleClassKeyword = "accessible";
    const checkboxRef = useRef(null);


    function toggleAccessibility() {
        const headerElement = document.querySelector("header");
        const mainElementButtons = document.querySelectorAll("main button");
        const mainInputElements = document.querySelectorAll("main input");
        if (checkboxRef.current.checked) {
            headerElement.classList.add(accessibleClassKeyword);
            for (let i = 0; i < mainElementButtons.length; i++) {
                mainElementButtons[i].classList.add(accessibleClassKeyword);
            }
            for (let i = 0; i < mainInputElements.length; i++) {
                mainInputElements[i].classList.add(accessibleClassKeyword);
            }
        }
        else {
            headerElement.classList.remove(accessibleClassKeyword);
            for (let i = 0; i < mainElementButtons.length; i++) {
                mainElementButtons[i].classList.remove(accessibleClassKeyword);
            }
            for (let i = 0; i < mainInputElements.length; i++) {
                mainInputElements[i].classList.remove(accessibleClassKeyword);
            }
        }
    }

    return (
        <div id="accessibility-toggler-container">
            <p>Accessibility:</p>
            <label className="switch">
                <input type="checkbox" id="toggle" ref={checkboxRef} onChange={toggleAccessibility}/>
                <span className="slider"></span>
            </label>
        </div>
    );
}

export default AccessibilityToggler