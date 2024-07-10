
export default function OHCLLabel({ data }) {

    let cssclass = 'green';
    const open = data[0];
    const close = data[3];

    if (open > close) {
        cssclass = 'red';
    }

    return (
        <p className="OHCLData">
            Open<label className={cssclass}>{data[0]}</label>
            High<label className={cssclass}>{data[1]}</label>
            Low<label className={cssclass}>{data[2]}</label>
            Close<label className={cssclass}>{data[3]}</label>
        </p>
    );

}