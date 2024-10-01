// import useSectionIntersectionObserver from "../../core/hooks/useSectionIntersectionObserver"
import classList from "../../core/helpers/classList";
import useIntersectionObserver from "../../core/hooks/useIntersectionObserver";

export default function (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    const { className = '', ...divProps } = props;
    const { isIntersecting, ref } = useIntersectionObserver<HTMLDivElement>();

    return <div
        className={`${className} ${classList(isIntersecting, 'active')}`}
        ref={ref}
        {...divProps} />
}