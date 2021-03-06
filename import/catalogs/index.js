var recipes = [
	{
		"name": "TIDBIT Dev Nginx",
		"type": "server",
		"subtype": "nginx",
		"description": "This recipe is used to deploy the nginx in the dev environment for the TIDBIT demos.",
		"recipe": {
			"deployOptions": {
				"image": {
					"prefix": "soajsorg",
					"name": "nginx",
					"tag": "latest",
					"pullPolicy": "IfNotPresent"
				},
				"readinessProbe": {
					"httpGet": {
						"path": "/",
						"port": "http"
					},
					"initialDelaySeconds": 5,
					"timeoutSeconds": 2,
					"periodSeconds": 5,
					"successThreshold": 1,
					"failureThreshold": 3
				},
				"restartPolicy": {
					"condition": "any",
					"maxAttempts": 5
				},
				"container": {
					"network": "soajsnet",
					"workingDir": "/opt/soajs/deployer/"
				},
				"voluming": {
					"volumes": [
						{
							"Type": "volume",
							"Source": "soajs_log_volume",
							"Target": "/var/log/soajs/"
						},
						{
							"Type": "bind",
							"ReadOnly": true,
							"Source": "/var/run/docker.sock",
							"Target": "/var/run/docker.sock"
						}
					]
				},
				"ports": [
					{
						"name": "http",
						"target": 80,
						"isPublished": true,
						"published": 81,
						"preserveClientIP": true
					},
					{
						"name": "https",
						"target": 443,
						"isPublished": true,
						"published": 444,
						"preserveClientIP": true
					}
				]
			},
			"buildOptions": {
				"env": {
					"SOAJS_ENV": {
						"type": "computed",
						"value": "$SOAJS_ENV"
					},
					"SOAJS_NX_DOMAIN": {
						"type": "computed",
						"value": "$SOAJS_NX_DOMAIN"
					},
					"SOAJS_NX_API_DOMAIN": {
						"type": "computed",
						"value": "$SOAJS_NX_API_DOMAIN"
					},
					"SOAJS_NX_SITE_DOMAIN": {
						"type": "computed",
						"value": "$SOAJS_NX_SITE_DOMAIN"
					},
					"SOAJS_NX_CONTROLLER_NB": {
						"type": "computed",
						"value": "$SOAJS_NX_CONTROLLER_NB"
					},
					"SOAJS_NX_CONTROLLER_IP": {
						"type": "computed",
						"value": "$SOAJS_NX_CONTROLLER_IP_N"
					},
					"SOAJS_NX_CONTROLLER_PORT": {
						"type": "computed",
						"value": "$SOAJS_NX_CONTROLLER_PORT"
					},
					"SOAJS_DEPLOY_HA": {
						"type": "computed",
						"value": "$SOAJS_DEPLOY_HA"
					},
					"SOAJS_HA_NAME": {
						"type": "computed",
						"value": "$SOAJS_HA_NAME"
					}
				},
				"cmd": {
					"deploy": {
						"command": [
							"bash"
						],
						"args": [
							"-c",
							"node index.js -T nginx"
						]
					}
				}
			}
		}
	},
	{
		"name": "TIDBIT Nodejs Recipe",
		"type": "service",
		"subtype": "nodejs",
		"description": "This recipe is used to deploy any NodeJS web server in any environment for the TIDBIT demos.",
		"recipe": {
			"deployOptions": {
				"image": {
					"prefix": "soajsorg",
					"name": "soajs",
					"tag": "latest",
					"pullPolicy": "IfNotPresent"
				},
				"specifyGitConfiguration": true,
				"restartPolicy": {
					"condition": "",
					"maxAttempts": 0
				},
				"container": {
					"network": "",
					"workingDir": "/opt/soajs/deployer/"
				},
				"voluming": {
					"volumes": [],
					"volumeMounts": []
				}
			},
			"buildOptions": {
				"settings": {
					"accelerateDeployment": true
				},
				"env": {
					"NODE_ENV": {
						"type": "static",
						"value": "production"
					},
					"SOAJS_GIT_OWNER": {
						"type": "computed",
						"value": "$SOAJS_GIT_OWNER"
					},
					"SOAJS_GIT_BRANCH": {
						"type": "computed",
						"value": "$SOAJS_GIT_BRANCH"
					},
					"SOAJS_GIT_COMMIT": {
						"type": "computed",
						"value": "$SOAJS_GIT_COMMIT"
					},
					"SOAJS_GIT_REPO": {
						"type": "computed",
						"value": "$SOAJS_GIT_REPO"
					},
					"SOAJS_GIT_TOKEN": {
						"type": "computed",
						"value": "$SOAJS_GIT_TOKEN"
					}
				},
				"cmd": {
					"deploy": {
						"command": [
							"bash"
						],
						"args": [
							"-c",
							"node index.js -T nodejs"
						]
					}
				}
			}
		}
	},
	{
		"name": "TIDBIT Dev SOAJS Recipe",
		"type": "service",
		"subtype": "soajs",
		"description": "This recipe is used to deploy any SOAJS services in the dev environment for the TIDBIT demos.",
		"recipe": {
			"deployOptions": {
				"image": {
					"prefix": "soajsorg",
					"name": "soajs",
					"tag": "latest",
					"pullPolicy": "IfNotPresent"
				},
				"specifyGitConfiguration": true,
				"readinessProbe": {
					"httpGet": {
						"path": "/heartbeat",
						"port": "maintenance"
					},
					"initialDelaySeconds": 5,
					"timeoutSeconds": 2,
					"periodSeconds": 5,
					"successThreshold": 1,
					"failureThreshold": 3
				},
				"restartPolicy": {
					"condition": "any",
					"maxAttempts": 5
				},
				"container": {
					"network": "soajsnet",
					"workingDir": "/opt/soajs/deployer/"
				},
				"voluming": {
					"volumes": [
						{
							"Type": "volume",
							"Source": "soajs_log_volume",
							"Target": "/var/log/soajs/"
						},
						{
							"Type": "bind",
							"ReadOnly": true,
							"Source": "/var/run/docker.sock",
							"Target": "/var/run/docker.sock"
						}
					]
				}
			},
			"buildOptions": {
				"settings": {
					"accelerateDeployment": true
				},
				"env": {
					"NODE_ENV": {
						"type": "static",
						"value": "production"
					},
					"NODE_TLS_REJECT_UNAUTHORIZED": {
						"type": "static",
						"value": "0"
					},
					"SOAJS_ENV": {
						"type": "computed",
						"value": "$SOAJS_ENV"
					},
					"SOAJS_PROFILE": {
						"type": "static",
						"value": "/opt/soajs/FILES/profiles/profile.js"
					},
					"SOAJS_SRV_AUTOREGISTERHOST": {
						"type": "static",
						"value": "true"
					},
					"SOAJS_SRV_MEMORY": {
						"type": "computed",
						"value": "$SOAJS_SRV_MEMORY"
					},
					"SOAJS_SRV_MAIN": {
						"type": "computed",
						"value": "$SOAJS_SRV_MAIN"
					},
					"SOAJS_GC_NAME": {
						"type": "computed",
						"value": "$SOAJS_GC_NAME"
					},
					"SOAJS_GC_VERSION": {
						"type": "computed",
						"value": "$SOAJS_GC_VERSION"
					},
					"SOAJS_GIT_PROVIDER": {
						"type": "computed",
						"value": "$SOAJS_GIT_PROVIDER"
					},
					"SOAJS_GIT_DOMAIN": {
						"type": "computed",
						"value": "$SOAJS_GIT_DOMAIN"
					},
					"SOAJS_GIT_OWNER": {
						"type": "computed",
						"value": "$SOAJS_GIT_OWNER"
					},
					"SOAJS_GIT_BRANCH": {
						"type": "computed",
						"value": "$SOAJS_GIT_BRANCH"
					},
					"SOAJS_GIT_COMMIT": {
						"type": "computed",
						"value": "$SOAJS_GIT_COMMIT"
					},
					"SOAJS_GIT_REPO": {
						"type": "computed",
						"value": "$SOAJS_GIT_REPO"
					},
					"SOAJS_GIT_TOKEN": {
						"type": "computed",
						"value": "$SOAJS_GIT_TOKEN"
					},
					"SOAJS_DEPLOY_HA": {
						"type": "computed",
						"value": "$SOAJS_DEPLOY_HA"
					},
					"SOAJS_HA_NAME": {
						"type": "computed",
						"value": "$SOAJS_HA_NAME"
					},
					"SOAJS_MONGO_NB": {
						"type": "computed",
						"value": "$SOAJS_MONGO_NB"
					},
					"SOAJS_MONGO_PREFIX": {
						"type": "computed",
						"value": "$SOAJS_MONGO_PREFIX"
					},
					"SOAJS_MONGO_RSNAME": {
						"type": "computed",
						"value": "$SOAJS_MONGO_RSNAME"
					},
					"SOAJS_MONGO_AUTH_DB": {
						"type": "computed",
						"value": "$SOAJS_MONGO_AUTH_DB"
					},
					"SOAJS_MONGO_SSL": {
						"type": "computed",
						"value": "$SOAJS_MONGO_SSL"
					},
					"SOAJS_MONGO_IP": {
						"type": "computed",
						"value": "$SOAJS_MONGO_IP_N"
					},
					"SOAJS_MONGO_PORT": {
						"type": "computed",
						"value": "$SOAJS_MONGO_PORT_N"
					},
					"SOAJS_DEPLOY_ACC": {
						"type": "static",
						"value": "true"
					}
				},
				"cmd": {
					"deploy": {
						"command": [
							"bash"
						],
						"args": [
							"-c",
							"node index.js -T service"
						]
					}
				}
			}
		}
	},
	{
		"name": "TIDBIT Java Recipe",
		"type": "service",
		"subtype": "java",
		"description": "This recipe is used to deploy any Java Web Application in any environment for the TIDBIT demos.",
		"recipe": {
			"deployOptions": {
				"image": {
					"prefix": "soajsorg",
					"name": "java",
					"tag": "latest",
					"pullPolicy": "IfNotPresent"
				},
				"specifyGitConfiguration": true,
				"container": {
					"workingDir": "/opt/soajs/deployer/"
				},
				"voluming": {
					"volumes": [],
					"volumeMounts": []
				}
			},
			"buildOptions": {
				"env": {
					"SOAJS_GIT_OWNER": {
						"type": "computed",
						"value": "$SOAJS_GIT_OWNER"
					},
					"SOAJS_GIT_BRANCH": {
						"type": "computed",
						"value": "$SOAJS_GIT_BRANCH"
					},
					"SOAJS_GIT_COMMIT": {
						"type": "computed",
						"value": "$SOAJS_GIT_COMMIT"
					},
					"SOAJS_GIT_REPO": {
						"type": "computed",
						"value": "$SOAJS_GIT_REPO"
					},
					"SOAJS_GIT_TOKEN": {
						"type": "computed",
						"value": "$SOAJS_GIT_TOKEN"
					},
					"SOAJS_JAVA_APP_PORT": {
						"type": "computed",
						"value": "$SOAJS_SRV_PORT"
					}
				},
				"cmd": {
					"deploy": {
						"command": [
							"sh"
						],
						"args": [
							"-c",
							"node index.js -T java"
						]
					}
				}
			}
		}
	}
];

module.exports = recipes;