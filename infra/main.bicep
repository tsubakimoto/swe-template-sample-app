@description('Azure region')
param location string = resourceGroup().location

@description('Web app name')
param appName string

@description('App Service plan name')
param planName string = '${appName}-plan'

@description('App Service SKU name')
@allowed([
  'B1'
  'S1'
  'P1v3'
])
param skuName string = 'B1'

@description('Runtime stack')
param linuxFxVersion string = 'DOTNETCORE|10.0'

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: '${appName}-appi'
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
  }
}

resource appServicePlan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: planName
  location: location
  kind: 'linux'
  sku: {
    name: skuName
    tier: startsWith(skuName, 'P') ? 'PremiumV3' : startsWith(skuName, 'S') ? 'Standard' : 'Basic'
    capacity: 1
  }
  properties: {
    reserved: true
  }
}

resource webApp 'Microsoft.Web/sites@2023-12-01' = {
  name: appName
  location: location
  kind: 'app,linux'
  properties: {
    httpsOnly: true
    serverFarmId: appServicePlan.id
    siteConfig: {
      alwaysOn: skuName == 'B1' ? false : true
      linuxFxVersion: linuxFxVersion
      minTlsVersion: '1.2'
      ftpsState: 'Disabled'
      appSettings: [
        {
          name: 'ASPNETCORE_ENVIRONMENT'
          value: 'Production'
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsights.properties.ConnectionString
        }
      ]
    }
  }
}

output webAppName string = webApp.name
