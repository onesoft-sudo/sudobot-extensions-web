import { forwardRef } from "react";

const ForwardRef = <T, P>({
    Component,
    props,
}: {
    Component: (props: P, ref: React.Ref<T>) => JSX.Element;
    props?: P;
}) => {
    const C: any = forwardRef<T, P>((props: P, ref) => {
        const { ...rest } = props;
        const C = Component as any;
        return <C {...rest} ref={ref as React.Ref<T>} />;
    });

    return <C {...props} />;
};
export default ForwardRef;
