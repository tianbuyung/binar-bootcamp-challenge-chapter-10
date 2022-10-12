export interface BreadCrumbsProps {
    data: BreadCrumbsDataProps[],
    baseColor: string;
};

interface BreadCrumbsDataProps {
    title: string;
    isActive: boolean;
    href?: string;
}

// { title: 'Home', isActive: false, href: "/" },
//         { title: product?.Category?.name, isActive: false, href: `/product/category/${product?.Category?.id}` },
//         { title: product?.name, isActive: true }