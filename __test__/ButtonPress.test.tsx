import ButtonPress from "@/app/components/ButtonPress";
import { ColorsApp } from "@/app/constants";
import React from "react";
import { Text, View } from "react-native";
import renderer from "react-test-renderer";


describe('ButtonPress simple form', () => {
    let tree: any
    beforeAll(()=>{
        tree = renderer.create(
        <ButtonPress>
            {(press) => (
              <View >
                <Text>Soy un boton</Text>
              </View>
            )}
        </ButtonPress>
        ).toJSON();
    })
    it('renders correctly', () => {
        expect(tree).toMatchSnapshot();
      });

    it('ButtonPress render text', () => {
        const textoSearch ="Soy un boton"
        const textInside = JSON.stringify(tree)
        const position = textInside.indexOf(textoSearch)        
        expect(position).toBeGreaterThan(0);
      });

    it('ButtonPress inactive color default is lightgray', () => {
        const colorDefault = tree.children[0].props.style[1].backgroundColor;
        expect(colorDefault).toStrictEqual(ColorsApp.lightgray);
      });

  });

describe('ButtonPress change color form', () => {
    let tree: any
    beforeAll(()=>{
        tree = renderer.create(
        <ButtonPress
            colorinactive={ColorsApp.yellow}
            colorPress={ColorsApp.darkyellow}
        >
            {(press) => (
              <View >
                <Text>Soy un boton</Text>
              </View>
            )}
        </ButtonPress>
        ).toJSON();
    })
    it('renders correctly', () => {
        expect(tree).toMatchSnapshot();
      });

    it('ButtonPress render text', () => {
        const textoSearch ="Soy un boton"
        const textInside = JSON.stringify(tree)
        const position = textInside.indexOf(textoSearch)        
        expect(position).toBeGreaterThan(0);
      });

    it('ButtonPress inactive color change for prop', () => {
        const colorDefault = tree.children[0].props.style[1].backgroundColor;
        expect(colorDefault).toStrictEqual(ColorsApp.yellow);
      });

    it('ButtonPress isnt lightgray', () => {
        const colorDefault = tree.children[0].props.style[1].backgroundColor;
        expect(colorDefault).not.toEqual(ColorsApp.lightgray);
      });

  });
