/*
 * Copyright 2019 FZI Forschungszentrum Informatik
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { DebugElement} from '@angular/core';
import { TestBed, async, inject,  ComponentFixture} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConsulConfigsPasswordComponent } from './consul-configs-password.component';
import {ConfigurationService} from '../shared/configuration.service'
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatGridListModule, MatInputModule, MatIconModule, MatTooltipModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';


describe('ConsulConfigsPasswordComponent', () =>{

    let fixture:   ComponentFixture<ConsulConfigsPasswordComponent>;

    let configurationServiceStub: Partial<ConfigurationService>;

    let component: ConsulConfigsPasswordComponent;
    
    let configurationServcie: ConfigurationService;

    beforeEach(async(() => {
        
        configurationServiceStub = {
             
            adjustConfigurationKey(consulKey) {         
                var str1 = consulKey.replace(/SP/g,"");
                str1 = str1.replace(/_/g," "); 
                if(str1.startsWith(" ")){
                    str1 = str1.slice(1,str1.length)
                }
                return str1 
        }
    };

        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                BrowserAnimationsModule,
                FlexLayoutModule,
                MatGridListModule,
                MatButtonModule,
                MatIconModule,
                MatInputModule,
                MatCheckboxModule,
                MatTooltipModule,
                FormsModule,
                HttpClientTestingModule
            ],
            declarations:
             [ConsulConfigsPasswordComponent],
            providers:
            [{provide: ConfigurationService, useValue: configurationServiceStub}]
        }).compileComponents();

         fixture = TestBed.createComponent(ConsulConfigsPasswordComponent)

        configurationServcie = fixture.debugElement.injector.get(ConfigurationService);

        component = fixture.componentInstance;


    }));

    it(`should create`, async(() => {
          expect(component).toBeTruthy();
      }));
    
      it('should show pw', async(() => {
          expect(component.password).toBe("*****");
      }));

      it(`should click button`, async(() => {
            spyOn(component, 'changePw');

            let input = fixture.debugElement.nativeElement.querySelector('input');
            input.click();
          
            fixture.whenStable().then(() => {
              expect(component.changePw).toHaveBeenCalled();
              const bannerDe: DebugElement = fixture.debugElement

              const inputDe = bannerDe.query(By.css('input'));
              const inputValue: HTMLElement = inputDe.nativeElement;

              expect(inputValue.textContent).toBe('')
            })
      }));
   

    
})