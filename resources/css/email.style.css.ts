import { COLOR_DARK, COLOR_LIGHT, COLOR_PRIMARY } from "../../config/constants";

export default `
:root {
    --border-radius: .5rem;
    --color-light: ${COLOR_LIGHT};
    --color-dark: ${COLOR_DARK};
    --color-muted: rgba(255, 255, 255, .6);
    --color-primary: ${COLOR_PRIMARY};
}

body,
body * {
    margin: 0;
    padding: 0;
    color: var(--color-light);
}

body {
    font-family: Arial, Helvetica, sans-serif;
    padding: 2.5rem 0;
}

.container {
    width: 80%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2.5rem 5%;
}

.bg-dark {
    background-color: var(--color-dark);
}

.rounded {
    border-radius: .5rem;
}

.display-1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.display-2 {
    font-size: 2rem;
}

.display-3 {
    font-size: 1.2rem;
}

.btn {
    padding: .7rem 1.5rem;
    border-radius: var(--border-radius);
    background-color: ;
    border: none;
    outline: none;
    color: var(--color-dark);
    font-weight: 400;
    cursor: pointer;
}

.btn-primary {
    background-color: var(--color-primary);
    color: var(--color-light);
}

.text-muted {
    color: var(--color-muted);
}

.mt-1 {
    margin-top: .5rem;
}

.mt-2 {
    margin-top: 1rem;
}

.mt-4 {
    margin-top: 2rem;
}


.mb-1 {
    margin-bottom: .5rem;
}

.mb-2 {
    margin-bottom: 1rem;
}

.mb-4 {
    margin-bottom: 2rem;
}

.my-2 {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.tac {
    text-align: center;
}`;
