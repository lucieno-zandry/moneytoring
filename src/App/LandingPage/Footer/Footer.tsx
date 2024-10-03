import { Link } from "react-router-dom"
import Section from "../../../partials/Section/Section"
import { signupPage } from "../../../core/config/links/pages"

export default function () {
    return <Section
        className="footer activable py-5 d-flex flex-column align-items-center justify-content-center gap-4 text-align-center bg-secondary text-dark">
        <h2 className="display-2">
            Ready to Transform <br />
            Your Finances?</h2>
        <p>
            Start managing your money smarter today with MoneyToring.
        </p>
        <Link className="col-6 btn btn-dark col-sm-3" to={signupPage}>Sign Up Now</Link>
    </Section>
}