An app to manage motorbike cares

## Vehicles management
``` mermaid
stateDiagram-v2
    [*] --> Home
    Home --> AccountTab

    AccountTab --> MyVehicles: select
    MyVehicles --> ListVehicles

    state ListVehicles {
      [*] --> VehicleDetail

      VehicleDetail --> DeleteVehicle
      DeleteVehicle --> [*]

      VehicleDetail --> EditVehicleDetail: select
      EditVehicleDetail --> VehicleDetail: close
      EditVehicleDetail --> [*]

      -- 

      [*] --> SelectVehicleType: add
      SelectVehicleType --> AddVehicleDetail: select
      AddVehicleDetail --> SelectVehicleType: cancel
      AddVehicleDetail --> [*]: save
    }

    ListVehicles --> [*]

```

## Transaction management
``` mermaid
stateDiagram-v2
    [*] --> Home
    Home --> AddTransaction: add
    state AddTransactionStart <<fork>>

    AddTransaction --> AddTransactionStart
    AddTransactionStart --> FillAmount
    AddTransactionStart --> SelectCategory
    AddTransactionStart --> TakeNote
    AddTransactionStart --> SelectDate

    AddTransactionStart --> Home: save/cancel

    SelectCategory --> CategoriesManagement: select
    CategoriesManagement --> SelectCategory: select/back

    state AddTransactionEnd <<join>>
    SelectDate --> AddTransactionEnd 
    TakeNote --> AddTransactionEnd 
    FillAmount --> AddTransactionEnd
    SelectCategory --> AddTransactionEnd
    AddTransactionEnd --> [*]
```

## CategoriesManagement
``` mermaid
stateDiagram-v2
    [*] --> Home
    Home --> AccountTab

    AccountTab --> Categories
    state Categories {
      [*] --> CategoryDetail: select
      CategoryDetail --> EditCategoryDetail: edit
      EditCategoryDetail --> CategoryDetail: save/cancel
      EditCategoryDetail --> DeleteCategory
      EditCategoryDetail --> [*]
      DeleteCategory --> [*]

      --

      [*] --> AddCategory: add
      AddCategory --> SelectParentCategory: select
      SelectParentCategory --> AddCategory: select/cancel
      AddCategory --> [*]
    }

    Categories --> [*]
```
