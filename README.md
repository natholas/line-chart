# nathan-angular-chart

## Installation

To install this library, run:

```bash
$ npm install nathan-angular-chart --save
```

## Consuming this library

```bash
$ npm install nathan-angular-chart
```

and then from your Angular `AppModule`:

```typescript
import { NathanAngularChart } from 'nathan-angular-chart';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    NathanAngularChart
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

Once the library is imported, you can use it as a component in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<nathan-angular-chart
  [data]="data"
  [labels]="labels"
  [colors]="colors" // optional
  [decimalPlaces]="decimalPlaces" // optional
  [fontSize]="fontSize" // optional
  [Input]="Input" // optional
  [limits]="limits" // optional
  [offsets]="offsets" // optional
  [size]="size" // optional
  [minLabelSpacing]="minLabelSpacing" // optional
></nathan-angular-chart>
```

## License

MIT © [Nathan Felix](mailto:natholas@gmail.com)
