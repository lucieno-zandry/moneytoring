import Button from "../../../partials/Button/Button";
import Section from "../../../partials/Section/Section";

export default function () {
    return <Section
        className="section2 d-flex justify-content-center flex-column align-items-center text-align-center gap-4 py-5">
        <h2 className="display-2 m-0">Powerful Features to <br /> Simplify Your Budgeting</h2>
        <p>
            From real-time expense tracking to detailed financial insights,<br />
            MoneyToring offers all the tools you need to stay on top of your finances.
        </p>
        <Button variant="outline-light">Learn more</Button>
    </Section>
}