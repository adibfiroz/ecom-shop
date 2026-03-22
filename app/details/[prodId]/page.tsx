import DetailsView from '@/components/details-view'

interface IProductParams {
    prodId?: string;
}

const DetailsPage = async ({ params }: { params: IProductParams }) => {

    const { prodId } = await params;

    return (
        <div>
            <DetailsView prodId={prodId!} />
        </div>
    )
}

export default DetailsPage