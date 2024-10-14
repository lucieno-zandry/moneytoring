import { loginPage } from "../../../core/config/links/pages";
import { ButtonLink } from "../../../partials/Button/Button";
import Section from "../../../partials/Section/Section";

export default function () {
    return <Section
        className="section2 d-flex justify-content-center px-3 flex-column align-items-center text-align-center gap-4 py-5">
        <h2 className="display-2 m-0">Powerful Features to <br /> Simplify Your Budgeting</h2>
        <p>
            From real-time expense tracking to detailed financial insights,<br />
            MoneyToring offers all the tools you need to stay on top of your finances.
        </p>
        <ButtonLink
            variant="outline-light"
            className="col-6 col-sm-3"
            to={loginPage}>Learn more</ButtonLink>
    </Section>
}