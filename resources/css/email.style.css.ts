import {
  BORDER_RADIUS,
  COLOR_DARK,
  COLOR_LIGHT,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
} from "../../config/constants";

export default `
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      color: ${COLOR_LIGHT};
      background-color: ${COLOR_DARK};
    }

    h1 {
      color: ${COLOR_SECONDARY};
      font-size: 24px;
      margin-bottom: 10px;
    }

    p {
      line-height: 1.5;
    }

    a {
      text-decoration: none;
    }

    .btn {
        padding: 10px 20px;
        border: none;
        border-radius: ${BORDER_RADIUS};
        cursor: pointer;
        width: 150px;
        margin: 0 auto;
    }
        
    .btn-primary{
        background-color: ${COLOR_PRIMARY};
        color: ${COLOR_LIGHT};
    }`;
