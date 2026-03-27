const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const

export default () => ({
  documentation: {
    config: {
      'x-strapi-config': {
        mutateDocumentation: (state: any) => {
          const paths = state?.paths ?? {}
          const updatedPaths: Record<string, any> = {}

          for (const [routePath, routeConfig] of Object.entries(paths)) {
            const nextPath =
              typeof routePath === 'string' && routePath.endsWith('/{id}')
                ? `${routePath.slice(0, -4)}{documentId}`
                : routePath

            const nextRouteConfig = routeConfig as Record<string, any>

            for (const method of HTTP_METHODS) {
              const operation = nextRouteConfig[method]
              if (!operation) continue

              operation.parameters = (operation.parameters ?? []).map((parameter: any) => {
                if (parameter?.in !== 'path' || parameter?.name !== 'id') {
                  return parameter
                }

                return {
                  ...parameter,
                  name: 'documentId',
                  description: parameter.description || 'Document ID',
                  schema: {
                    ...parameter.schema,
                    type: 'string',
                  },
                }
              })

              if (typeof operation.operationId === 'string') {
                operation.operationId = operation.operationId.replace('{id}', '{documentId}')
              }
            }

            updatedPaths[nextPath] = nextRouteConfig
          }

          state.paths = updatedPaths
          return state
        },
      },
    },
  },
})
