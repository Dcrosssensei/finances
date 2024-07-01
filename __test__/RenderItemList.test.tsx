import RenderItemList from "@/app/pages/home/components/listComponent/components/RenderItemList";
import React from "react";
import renderer from "react-test-renderer";


describe('RenderItemList', () => {
    let tree: any
    const itemTest = {
        "id": "001",
        "name": "Producto Innovador A",
        "description": "Producto A ofrece una solución integral con características avanzadas que mejoran la eficiencia y la productividad.",
        "logo": "https://handsonbanking.org/wp-content/uploads/2021/02/debitcard_front_blue.png",
        "date_release": new Date("2024-01-29"),
        "date_revision": new Date("2024-06-29")
      }

    beforeAll(()=>{
        tree = renderer.create(
        <RenderItemList 
            item={itemTest}
            index={0}
            selectItem={(item, index)=>{}}
        />
        ).toJSON();
    })
    it('renders correctly', () => {
        expect(tree).toMatchSnapshot();
      });

    it('renders name', () => {
        const nameRendered = tree.children[0].children[0].children[0];
        expect(nameRendered).toEqual("Producto Innovador A");
      });

    it('renders ID', () => {
        const nameRendered = tree.children[0].children[1].children[1];
        expect(nameRendered).toEqual("001");
      });


  });
