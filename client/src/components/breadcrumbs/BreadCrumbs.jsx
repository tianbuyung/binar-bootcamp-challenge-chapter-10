import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbComponent({ data }) {
  return (
    <Breadcrumb>
    {data.map((d, index) => (
        <Breadcrumb.Item
            key={index}
            active={d?.isActive}
            href={d?.href}
        >
            { d?.title }
        </Breadcrumb.Item>
    ))}
      
      {/* <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
    </Breadcrumb>
  );
}

export default BreadcrumbComponent;