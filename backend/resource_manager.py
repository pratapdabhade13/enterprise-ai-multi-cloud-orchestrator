class ResourceManager:

    def get_resources(self, provider):
        resources = {
            "AWS": [
                {
                    "id": "aws-001",
                    "name": "Production Server",
                    "type": "EC2",
                    "status": "Running",
                    "region": "us-east-1",
                    "cpu": "4 vCPU",
                    "memory": "16 GB",
                    "cost": "$145/month"
                },
                {
                    "id": "aws-002",
                    "name": "Application Storage",
                    "type": "S3",
                    "status": "Active",
                    "region": "us-east-1",
                    "storage": "500 GB",
                    "cost": "$25/month"
                }
            ],

            "Azure": [
                {
                    "id": "azure-001",
                    "name": "Enterprise VM",
                    "type": "Virtual Machine",
                    "status": "Running",
                    "region": "East US",
                    "cpu": "4 vCPU",
                    "memory": "16 GB",
                    "cost": "$160/month"
                },
                {
                    "id": "azure-002",
                    "name": "Company Storage",
                    "type": "Blob Storage",
                    "status": "Active",
                    "region": "East US",
                    "storage": "600 GB",
                    "cost": "$30/month"
                }
            ],

            "Google Cloud": [
                {
                    "id": "gcp-001",
                    "name": "Analytics Server",
                    "type": "Compute Engine",
                    "status": "Running",
                    "region": "us-central1",
                    "cpu": "4 vCPU",
                    "memory": "16 GB",
                    "cost": "$135/month"
                },
                {
                    "id": "gcp-002",
                    "name": "Data Storage",
                    "type": "Cloud Storage",
                    "status": "Active",
                    "region": "us-central1",
                    "storage": "450 GB",
                    "cost": "$22/month"
                }
            ]
        }

        return resources.get(provider, [])

    def get_all_resources(self):
        all_resources = []

        for provider in ["AWS", "Azure", "Google Cloud"]:
            provider_resources = self.get_resources(provider)

            for resource in provider_resources:
                resource["provider"] = provider
                all_resources.append(resource)

        return all_resources

    def get_resource_by_id(self, resource_id):
        all_resources = self.get_all_resources()

        for resource in all_resources:
            if resource["id"] == resource_id:
                return resource

        return None