class CloudManager:

    def get_providers(self):
        return [
            "AWS",
            "Azure",
            "Google Cloud"
        ]

    def get_cloud_info(self, provider):
        cloud_info = {
            "AWS": {
                "name": "Amazon Web Services",
                "status": "Ready"
            },
            "Azure": {
                "name": "Microsoft Azure",
                "status": "Ready"
            },
            "Google Cloud": {
                "name": "Google Cloud Platform",
                "status": "Ready"
            }
        }

        return cloud_info.get(provider, {
            "name": "Unknown",
            "status": "Not Available"
        })