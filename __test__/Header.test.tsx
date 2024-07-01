import Header from "@/app/components/Header";
import React from "react";
import renderer from "react-test-renderer";

jest.mock("@react-navigation/core"); 

describe('Header With Back true', () => {
    let tree:any
    beforeAll(()=>{
        tree = renderer.create(<Header back />).toJSON();
    })
    it('should render the correct text', () => {
        const backButton = tree.children[0].children[0].children[0];
        expect(backButton.children).toContain('Back');
    
        const title = tree.children[1].children[1];
        expect(title.children).toContain('BANCO');
      });
  });
  
describe('Header With Back false', () => {
    let tree:any
    beforeAll(()=>{
        tree = renderer.create(<Header back={false} />).toJSON();
    })
    it('should render the correct text', () => {
        const title = tree.children[0].children[1];
        expect(title.children).toContain('BANCO');
      });
  });
