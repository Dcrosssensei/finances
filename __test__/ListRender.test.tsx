import ListRender from "@/app/pages/home/components/listComponent/ListRender";
import React from "react";
import renderer from "react-test-renderer";
import {getNestedChild} from './helpers/nestedChildAux'
import { ProductTypes } from "@/app/models";

describe('RenderItemList', () => {
    let tree: any
    const itemsTest = [{
        "id": "001",
        "name": "Producto Innovador A",
        "description": "Producto A ofrece una solución integral con características avanzadas que mejoran la eficiencia y la productividad.",
        "logo": "https://handsonbanking.org/wp-content/uploads/2021/02/debitcard_front_blue.png",
        "date_release": new Date("2024-01-29"),
        "date_revision": new Date("2024-06-29")
      },
      {
        "id": "product-id-002",
        "name": "Producto Revolucionario B",
        "description": "Producto B es conocido por su durabilidad y rendimiento superior en diversas condiciones operativas.",
        "logo": "https://handsonbanking.org/wp-content/uploads/2021/02/debitcard_front_blue.png",
        "date_release": new Date("2024-01-29"),
        "date_revision": new Date("2024-06-29")
      }
    ]

    beforeAll(()=>{
        tree = renderer.create(
        <ListRender 
            data={itemsTest}
            selectItem={(item, index)=>{}}
        />
        ).toJSON();
    })
    it('renders correctly', () => {
        expect(tree).toMatchSnapshot();
      });

    it('renders name first product', () => {
        
        const nameRendered =getNestedChild(tree,6);
        expect(nameRendered).toEqual("Producto Innovador A");
    });
    
    it('renders name second product', () => {
        const secondBranch =tree.children[0].children[1]
        const nameRendered =getNestedChild(secondBranch,4)
        expect(nameRendered).toEqual("Producto Revolucionario B");
    });
    
    it('renders first ID', () => {
        const firstChange =getNestedChild(tree,4);
        const idRendered = firstChange.children[1].children[1]
        expect(idRendered).toEqual("001");
      });

    it('renders second ID', () => {
        const secondBranch =tree.children[0].children[1]
        const firstChange =getNestedChild(secondBranch,2);
        const idRendered = firstChange.children[1].children[1]
        expect(idRendered).toEqual("product-id-002");
      });


  });

describe('RenderItemList without data', () => {
    let tree: any
    const itemsTest: ProductTypes[]  = []

    beforeAll(()=>{
        tree = renderer.create(
        <ListRender 
            data={itemsTest}
            selectItem={(item, index)=>{}}
        />
        ).toJSON();
    })
    it('renders correctly', () => {
        expect(tree).toMatchSnapshot();
      });

      it('renders message', () => {
        const nameRendered = getNestedChild(tree,5);
        expect(nameRendered).toEqual("No se encontraron Resultados");
      });

  });
